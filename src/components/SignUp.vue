<template>
<div>
  <headerComponent></headerComponent>
  <div class="form">
    <h2 class="titles">Izena eman</h2>
    <input v-model="email" type="email" placeholder="Emaila" required>
    <input v-model="password" type="password" placeholder="Pasahitza" required>
    <input v-model="name" type="text" placeholder="Erabiltzaile izena" required>
    <button @click="createUser">Eman izena</button>
    <p v-if="msg" class="form__error">{{msg}}</p>
    <p class="form__sign-up">Saioa hasteko
      <router-link :to="{ name: 'login' }">egin klik hemen!</router-link>
    </p>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import headerComponent from './Header.vue'

export default {
  name: 'signUp',
  components: {
    headerComponent
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      msg: ''
    }
  },
  methods: {
    createUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            firebase.database().ref('users/' + user.uid).set({
              displayName: this.name
            })
            this.$store.dispatch('a_authStateObserver')
            this.$router.replace('ofizioak')
          },
          (err) => {
            if(err.code === 'auth/invalid-email') {
              this.msg = 'Emaila ez da balekoa'
            } else if(err.code === 'auth/email-already-in-use') {
              this.msg = 'Email hau erregistratua dago dagoeneko'
            } else {
              this.msg = err.message
            }
          }
        )
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
