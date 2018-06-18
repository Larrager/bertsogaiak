<template>
<div>
  <header-component></header-component>
  <div class="form">
    <h2 class="titles">Saioa hasi</h2>
    <input v-model="email" type="text" placeholder="Emaila">
    <input v-model="password" type="password" placeholder="Pasahitza">
    <button @click.prevent="signIn">Saioa hasi!</button>
    <p v-if="msg" class="form__error">{{msg}}</p>
    <p class="form__sign-up">Pasahitza galdu duzu?
      <router-link :to="{ name: 'resetPassword' }">eskatu berria!</router-link>
    </p>
    <p class="form__sign-up">Kontu berria sortzeko
      <router-link :to="{ name: 'signUp' }">egin klik hemen!</router-link>
    </p>
    <h3>Edo Google bidez hasi saioa</h3>
    <button @click="signInWithGoogle" class="button-google">Googlerekin saioa hasi</button>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import headerComponent from './Header.vue'

export default {
  name: 'login',
  components: {
    headerComponent
  },
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$store.dispatch('a_authStateObserver')
            this.msg = ''
            this.$router.replace('/')
          },
          (err) => {
            if(err.code === 'auth/invalid-email') {
              this.msg = 'Emaila ez da balekoa'
            } else if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
              this.msg = 'Emandako datuak ez dira zuzenak'
            } else {
              this.msg = err.message
            }
          }
        )
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          this.$store.dispatch('a_authStateObserver')
          this.$router.replace('/')
        })
        .catch(err => {
          this.msg = err.message
        })
    }
  }
}
</script>

<style lang="scss">
@import '../scss/settings';
.titles {
    color: white;
}
</style>
