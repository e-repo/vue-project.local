import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'
import BuyModalComponent from './components/Shared/BuyModal'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDY5wPH8M6zkq5CiQoJ9_qf6icjuXwUgvo",
      authDomain: "vue-ads-project-7e63f.firebaseapp.com",
      databaseURL: "https://vue-ads-project-7e63f.firebaseio.com",
      projectId: "vue-ads-project-7e63f",
      storageBucket: "vue-ads-project-7e63f.appspot.com",
      messagingSenderId: "892232356523",
      appId: "1:892232356523:web:c53bd494fb1cec02389dee"
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
