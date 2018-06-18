<template>
<div>
  <header-single></header-single>
  <div v-if="user != false" class="single-page">
    <div class="single-page__header">
      <div class="single-page__title">{{ this.decode }}
        <span class="single-page__count">GOGOKOAK</span>
      </div>

      <div v-if="user" class="single-page__likes">
        <router-link :to="{ name: $route.params.type }">
          <img src="../assets/heart.svg" class="heart-intro" alt="">
        </router-link>
      </div>
    </div>

    <div class="search-box">
      <input class="search-input gogokoak" :class="{ elements: $route.params.type == 'ofizioak' }" type="text" v-model="search" placeholder="Gogokoen artean iragazi...">
      <template>
          <select v-if="$route.params.type == 'ofizioak'" class="search-select" v-model="searchMetric">
            <option v-for="metric in optionsMetrics"
              :value="metric.value">
              {{metric.name}}
            </option>
          </select>
        </template>
    </div>

    <ul class="list">
      <li v-for="item in firebaseResponse" class="list__item"
      :class="{ active: openOptionsClass == item.id }"
      v-if="item.type == $route.params.type">
        <div class="list__element" @click="openOptions(item.id)">
          {{ item.text }}
          <span v-if="$route.params.type == 'ofizioak'" class="list__metric">{{ item.metric }}</span>
        </div>
        <div class="list__options">

          <div class="list__likes liked" @click="removeUserData(item.id)">
            <img src="../assets/heart-orange.svg" alt="">
          </div>

        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
//import Multiselect from 'vue-multiselect'
//import InfiniteLoading from 'vue-infinite-loading'
import headerSingle from './HeaderSingle.vue'

export default {
  components: {
    headerSingle
  },
  name: 'gogokoak',
  data() {
    return {
      loading: true,
      response: [],
      optionsMetrics: this.$store.getters.getMetrics,
      search: '',
      searchMetric: '',
      openOptionsClass: '',
      decode: atob(this.$route.params.title)
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    firebaseResponse() {
      const userId = this.$store.state.user.uid
      const db = firebase.database()
        .ref('users/' + userId).child('stars')
        .on('value', snapshot => {
          this.response = this.snapshotToArray(snapshot)
        })

      return this.response
        .filter(key => key.text.toLowerCase().includes(this.search.toLowerCase()))
        .filter(key => key.metric.toLowerCase().includes(this.searchMetric.toLowerCase()))
    }
  },
  methods: {

    openOptions(item) {
      this.openOptionsClass === item || this.response == '' ? this.openOptionsClass = '' : this.openOptionsClass = item
    },
    snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
      })
      return returnArr;
    },
    removeUserData(starId) {
      if (this.$store.state.user) {
        const userId = this.$store.state.user.uid
        for (let key in this.response) {
          if (this.response[key].id === starId) {
            firebase.database().ref('users/' + userId).child('stars/' + this.response[key].key).remove()
            return false
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/settings';
@import '../scss/forms';

.heart-intro {
    animation: heart-intro 0.6s;
}
.gogokoak {
    width: 100%;
    @include from(sm) {
        width: 100%!important;
        &.elements {
            width: 70%;
        }
    }
}
@keyframes heart-intro {
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(1.6);
    }
    100% {
        transform: scale(1);
    }
}
</style>
