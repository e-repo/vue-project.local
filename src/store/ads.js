import * as fb from 'firebase'

class Ad {
    constructor (payload) {
        this.title          = payload.title
        this.description    = payload.description
        this.ownerId        = payload.ownerId
        this.imageSrc       = payload.imageSrc ? payload.imageSrc : ''
        this.promo          = payload.promo ? payload.promo : false
        this.id             = payload.id ? payload.id : null
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        updateAd (state, {title, description, id}) {
            const ad = state.ads.find(a => {
                return a.id === id
            })

            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image

            try {
                payload.ownerId = getters.user.id

                const newAd = new Ad(payload)
                const ad = await fb.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))

                /**
                 *
                 * Добавляем изображение в firebase storage
                 *
                 */
                const fileData = await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(image)

                /**
                 *
                 * Получаем ссылку на загруженное изображение
                 * fileData.ref.fullPath - содержит расположение файла в хранилище
                 * getDownloaduRL - метод для оплучения ссылки на картинку
                 * (https://firebase.google.com/docs/storage/web/download-files)
                 *
                 */
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

                /**
                 *
                 * Обновляем картинку в базе данных
                 * метов child для поиска элемента в таблице
                 *
                 */
                await fb.database().ref('ads').child(ad.key).update({imageSrc})

                commit('setLoading', false)
                commit('createAd', {...newAd, id: ad.key, imageSrc})
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try {
                /**
                 * метов once разово возвращает все эелменты массива
                 * @type {firebase.database.DataSnapshot}
                 */
                const fbVal = await fb.database().ref('ads').once('value')
                const ads = fbVal.val() // val() - для получения значения массива

                Object.keys(ads).forEach(key => {
                    const ad  = ads[key]
                    resultAds.push(
                        {...ad, id: key}
                    )
                })

                commit ('loadAds', resultAds)
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },
        async updateAd ({commit}, {title, description, id}) {
            commit('clearError')
            commit('setLoading', true)
            
            try {
                await fb.database().ref('ads').child(id).update({title, description})
                commit('updateAd', {title, description, id})

                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        }
    },
    getters: {
        ads (state) {
            return state.ads;
        },
        promoAds (state) {
            /**
             * Функция filter отфильтровывает массив,
             * вызывая колбэк функцию для каждого элемента массива для свойства promo
             */
            return state.ads.filter(ad => {
                return ad.promo
            });
        },
        myAds (state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById (state) {
            /**
             * Можно вернуть не только результат но и саму функцию
             */
            return adId => {
                /**
                 * Функция find находит элемент масива,
                 * вызывая колбэк функцию для каждого элемента массива
                 * true - эелемент найден, false - продалжаем поиск
                 */
                return state.ads.find(ad => adId === ad.id)
            }
        }
    }
}