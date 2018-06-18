import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: false,
    metrics: [{
        value: '',
        name: 'Aukeratu metrika'
      },
      {
        value: 'zortziko txikia',
        name: 'Zortziko Txikia'
      },
      {
        value: 'zortziko handia',
        name: 'Zortziko Handia'
      },
      {
        value: 'hamarreko txikia',
        name: 'Hamarreko Txikia'
      },
      {
        value: 'hamarreko handia',
        name: 'Hamarreko Handia'
      },
      {
        value: 'kopla',
        name: 'Kopla'
      }
    ],
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getMetrics: (state) => {
      return state.metrics;
    }
  },
  mutations: {
    m_logInUser: (state, user) => {
        state.user = user;
    }
  },
  actions: {
      a_authStateObserver: ({commit, state}) => {
          firebase.auth().onAuthStateChanged(user => {
              if (user) {
                  commit('m_logInUser', user);
              } else {
                  user = false
                  commit('m_logInUser', user);
              }
          })
      }
  }
})
