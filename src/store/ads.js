import * as fb from 'firebase'

class Ad {
    constructor (payload) {
        this.title          = payload.title
        this.description    = payload.description
        this.ownerId        = payload.ownerId
        this.imageSrc       = payload.imageSrc
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
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                payload.ownerId = getters.user.id

                const newAd = new Ad(payload)
                const ad = await fb.database().ref('ads').push(newAd)

                commit('setLoading', false)
                commit('createAd', {...newAd, id: ad.key})
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

                console.log(resultAds)

                commit ('loadAds', resultAds)
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
        myAds (state) {
            return state.ads
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