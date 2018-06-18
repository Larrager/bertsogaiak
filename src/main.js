import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {store} from './store'
import {routes} from './routes'
import App from './App.vue'
import Header from './components/Header.vue'
import firebase from 'firebase'
import {config} from './config'

//firebase
firebase.initializeApp(config);

//vue router
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title ? to.meta.title + ' - ' : '') + 'Bertso Gaiak';
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('a_authStateObserver')
  }
})
