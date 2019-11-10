import * as fb from 'firebase'

class Order {
    constructor (params) {
        this.name   = params.name
        this.phone  = params.phone
        this.adId   = params.adId
        this.done   = params.done ? params.done : false
        this.id     = params.id ? params.id : null
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders (state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async createOrder ({commit}, payload) {
            const order = new Order(payload)

            try {
                await fb.database().ref(`/users/${payload.ownerId}/orders`).push(order)
            } catch (e) {
                commit('setError', e.message)
                throw e
            }
        },
        async fetchOrders ({commit, getters}) {
            commit('setLoading', true)
            commit('clearError')

            const resultOrders = []

            try {
                const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
                const orders = fbVal.val()

                Object.keys(orders).forEach(key => {
                    resultOrders.push({...orders[key], key})
                })

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (e) {
                commit('setLoading', false)
                commit('setError', e.message)
            }
        },
        async markOrderDone ({commit, getters}, payload) {
            commit('clearError')
            try {
                await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
                    done: true
                })
            } catch (e) {
                commit('setError', e.message)
                throw e
            }
        }

    },
    getters: {
        doneOrders (state) {
            return state.orders.filter(o => o.done)
        },
        undoneOrders (state) {
            return state.orders.filter(o => !o.done)
        },
        orders (state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders);
        }
    }
}