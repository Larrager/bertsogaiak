<template>
<div>
  <headerComponent></headerComponent>
  <div class="form">
    <h2 class="titles">Pasahitza berreskuratu</h2>
    <p>Sartutako emaila balekoa bada, email bat jasoko duzu pasahitz berria berrezartzeko argibideekin.</p>
    <input v-model="email" type="text" placeholder="Emaila">
    <button @click.prevent="resetPassword">Pasahitza eskatu</button>
    <p v-if="msg" class="form__error">{{msg}}</p>
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
      msg: ''
    }
  },
  methods: {
    resetPassword() {
      this.msg = ''
      firebase.auth().sendPasswordResetEmail(this.email)
        .then(() => {
          this.msg = 'Email bat bidali dizugu pasahitz berria ezar dezazun'
        })
        .catch(err => {
          if(err.code === 'auth/invalid-email') {
            this.msg = 'Emaila ez da balekoa'
          } else if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            this.msg = 'Emandako datuak ez dira zuzenak'
          } else {
            this.msg = err.message
          }
        });
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
