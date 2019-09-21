import fb from 'firebase'

export default function (to, from, next) {
    next(vm => {
        if (!vm.$store.getters.user) {
            fb.auth().onAuthStateChanged(user => {
                if (user) {
                    vm.$store.dispatch('autoLoginUser', user)
                    next()
                } else {
                    next('/login?loginError=true')
                }
            })
        }
    })
}