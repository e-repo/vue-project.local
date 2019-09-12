export default {
    state: {
        ads: [
            {
                title: 'Title1',
                description: 'description1',
                promo: true,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider1',
                imageCardSrc: 'https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Cart1',
                id: 123
            },
            {
                title: 'Title2',
                description: 'description2',
                promo: true,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider2',
                imageCardSrc: 'https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Cart2',
                id: 124
            },
            {
                title: 'Title3',
                description: 'description3',
                promo: false,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider3',
                imageCardSrc: 'https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Cart3',
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
        createAd ({commit, state}, payload) {
            const indexAd = state.ads.length - 1
            payload.id = state.ads[indexAd].id + 1;
            commit('createAd', payload)
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