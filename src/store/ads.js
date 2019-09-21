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
        ads: [
            {
                title: 'Title1',
                description: 'description1',
                promo: true,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider1',
                id: 123
            },
            {
                title: 'Title2',
                description: 'description2',
                promo: true,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider2',
                id: 124
            },
            {
                title: 'Title3',
                description: 'description3',
                promo: false,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider3',
                id: 125
            },
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            try {
                payload.ownerId = getters.user.id
                const newAd = new Ad(payload)

                const fbVal = await fb.database().ref('ads').push(newAd)
                console.log(fbVal)
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