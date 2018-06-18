<template>
<header class="main-header">
  <div class="main-header__top" :class="{ active : scrollPosition >= 250 }">
    <router-link :to="{ name: 'home' }">
      <img src="../assets/logo.svg" alt="BertsoGaiak" class="main-header__logo">
    </router-link>
    <div class="main-header__user">
      <template v-if="this.$store.state.user">
          <img src="../assets/user-o.svg" alt="">
          <div class="main-header__user-name">{{ this.$store.state.user.email }}</div>
          <span>|</span>
          <div class="main-header__log-out" @click.prevent="logOut">Irten</div>
        </template>
      <template v-else>
          <router-link :to="{ name: 'login' }">Saioa hasi</router-link>
          <span>|</span>
          <router-link :to="{ name: 'signUp' }">Izena eman</router-link>
        </template>
    </div>
  </div>
</header>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'headerSingle',
  data() {
    return {
      scrollPosition: null,
      user: this.$store.state.user
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
        .then(() => {
          this.$store.dispatch('a_authStateObserver')
          this.$router.replace('/')
        })
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/settings';
.main-header {
    &__top {
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(black,.1);
        background: $secondary;
        padding: 0.8em 1em;
        box-sizing: border-box;
        height: 82px;
        &.active {
            position: fixed;
            padding: 0.3em 1em;
            background: $secondary;
            box-shadow: 0 5px 15px rgba(black,.25);
            animation: header 0.4s;
        }
    }
    &__logo {
      width: 120px;
      @include from(sm) {
          font-size: 14px;
          width: 160px;
      }
    }
    &__user {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        color: white;
        font-size: 13px;
        line-height: 16px;
        @include from(sm) {
            font-size: 14px;
        }
        &-name {
            display: none;
            @include from(sm) {
                display: block;
            }
        }
        img {
            height: 22px;
            margin: 0 0.3em;
            display: none;
            @include from(sm) {
                display: block;
            }
        }
    }
    span {
        padding: 0 0.5em;
        @include from(sm) {
            padding: 0 0.8em;
            display: block;
        }
    }
    &__log-out {
        padding: 0.5em;
        border: none;
        border-radius: 3px;
        background: rgba(black,.1);
        color: white;
        margin-left: 0.3em;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: rgba(black,.3);
        }
    }
}

@keyframes header {
    0% {
        transform: translateY(-100px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
