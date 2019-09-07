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
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider1',
                imageCardSrc: 'https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Cart2',
                id: 124
            },
            {
                title: 'Title3',
                description: 'description3',
                promo: false,
                imageSrc: 'https://via.placeholder.com/1200x600/OOOOOO/FFFFFF?text=Slider1',
                imageCardSrc: 'https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Cart3',
                id: 125
            },
        ]
    },
    mutations: {},
    actions: {},
    getters: {
        ads (state) {
            return state.ads;
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            });
        },
        myAds (state) {
            return state.ads
        }
    }
}