import * as fb from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registerUser ({commit}, {email, password}) {
            /**
             * Очищаем все ошибки (store shared.js)
             */
            commit  ('clearError')

            /**
             * Устанавливаем статус загрузки (store shared.js)
             */
            commit ('setLoading', true)

            try {
                /**
                 * firebase method для взаимодействия с firebase
                 */
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit ('setUser', new User(user.uid))
                commit ('setLoading', false)
            } catch (e) {
                commit ('setLoading', false)
                commit ('setError', e.message)
                throw e
            }
        },
        async loginUser ({commit}, {email, password}) {
            /**
             * Очищаем все ошибки (store shared.js)
             */
            commit  ('clearError')

            /**
             * Устанавливаем статус загрузки (store shared.js)
             */
            commit ('setLoading', true)

            try {
                /**
                 * firebase method для взаимодействия с firebase
                 */
                const {user} = await fb.auth().signInWithEmailAndPassword(email, password)
                commit ('setUser', new User(user.uid))
                commit ('setLoading', false)
            } catch (e) {
                commit ('setLoading', false)
                commit ('setError', e.message)
                throw e
            }
        },
        autoLoginUser ({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser ({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        isUserLoggedIn (state) {
            return state.user !== null
        }
    }
}