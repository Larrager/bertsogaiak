<template>
<div>
  <header-single></header-single>
  <div class="single-page">
    <div class="single-page__header">
      <div class="single-page__title">{{ singleType }}
        <span class="single-page__count">({{ totals }})</span>
      </div>
      <div v-if="this.$store.state.user" class="single-page__likes">
        <router-link :to="{ name: 'gogokoak', params: { type: this.slug, title: this.encode } }">
          <img src="../assets/heart-o.svg" alt="">
        </router-link>
      </div>
    </div>

    <div class="search-box">
      <input class="search-input" type="text" v-model="search" placeholder="Gai guztien artean iragazi...">
      <template v-if="singleType == 'Ofizioak'">
          <select class="search-select" v-model="searchMetric">
            <option v-for="metric in optionsMetrics"
              :value="metric.value">
              {{metric.name}}
            </option>
          </select>
        </template>
      <input type="submit" class="search-submit" @click="searchFilter()" value="Bilaketa egin">
    </div>

    <div class="loading">
      <div v-if="loading" class="loading__animation"></div>
    </div>

    <!-- Navigation -->
    <div class="navigation">
      <a v-if="prev" @click="searchFilter(prev)">Aurrekoa</a>
      <a v-if="next" @click="searchFilter(next)">Hurrengoa</a>
    </div>

    <ul class="list">
      <li v-for="item in response" class="list__item" :class="{ active: openOptionsClass == item.id && user != false }">
        <div class="list__element" @click="openOptions(item.id)">
          {{ item.text }} <span class="list__metric">{{ item.metric }}</span>
        </div>
        <div class="list__options">
          <template v-if="user && verifyLikes(item.id)">
                <div class="list__likes liked" @click="writeUserData(item.id, item.metric, item.text)">
                  <img src="../assets/heart-orange.svg" alt="">
                </div>
          </template>
          <template v-else>
                <div class="list__likes" @click="writeUserData(item.id, item.metric, item.text)">
                  <img src="../assets/heart-orange-o.svg" alt="">
                </div>
              </template>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import {apiUrls} from '../config'
//import Multiselect from 'vue-multiselect'
//import InfiniteLoading from 'vue-infinite-loading'
import headerSingle from './HeaderSingle.vue'

export default {
  name: 'ofizioka',
  components: {
    headerSingle
  },
  props: ['singleType', 'slug'],
  data() {
    return {
      loading: true,
      response: [],
      optionsMetrics: this.$store.getters.getMetrics,
      search: '',
      searchMetric: '',
      searchMode: '',
      next: '',
      prev: '',
      previous: '',
      totals: '',
      openOptionsClass: '',
      likes: '',
      encode: btoa(this.singleType)
    }
  },
  created() {
    this.searchFilter()
  },
  computed: {
    user() {
        const userId = this.$store.state.user.uid
        const db = firebase.database()
          .ref('users/' + userId).child('stars')
          .on('value', snapshot => {
            this.likes = this.snapshotToArray(snapshot)
          })
      return this.$store.getters.getUser
    }
  },
  methods: {
    snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
      })
      return returnArr;
    },
    searchFilter(pagination = false) {
      this.loading = true
      if (pagination) {
        const apiUrl = pagination
        axios.get(apiUrl)
          .then(response => {
            this.loading = false
            this.response = response.data.results
            this.next = response.data.next
            this.prev = response.data.previous
            this.totals = response.data.count
          })
      } else {
        let apiUrl = ''
        if (this.slug == 'ofizioak') {
          apiUrl = apiUrls.ofizioak
        } else if (this.slug == 'gaia-emanda') {
          apiUrl = apiUrls.gaiaEmanda
        } else if (this.slug == 'puntu-erantzunak') {
          apiUrl = apiUrls.puntuErantzunak
        }

        axios.get(apiUrl, {
            params: {
              search: this.search,
              metric: this.searchMetric
            },
          })
          .then(response => {
            this.loading = false
            this.response = response.data.results
            this.next = response.data.next
            this.prev = response.data.previous
            this.totals = response.data.count
          })
      }
      return this.response
    },
    openOptions(item) {
      this.openOptionsClass === item ? this.openOptionsClass = '' : this.openOptionsClass = item
    },
    verifyLikes(item) {
      let find = false
      for (let key in this.likes) {
        if (this.likes[key].id === item) {
          find = true
        }
      }
      return find
    },
    writeUserData(starId, metric, text) {
      if (this.user) {
        const userId = this.user.uid
        let find = false
        const db = firebase.database()
          .ref('users/' + userId)
          .child('stars')
          .on('value', snapshot => {
            this.likes = snapshot.val()
          })
        for (let key in this.likes) {
          if (this.likes[key].id === starId) {
            firebase.database().ref('users/' + userId).child('stars/' + key).remove()
            find = true
          }
        }
        if (find === false) {
          if (!metric) {
            metric = '-'
          }
          firebase.database().ref('users/' + userId).child('stars').push({
            id: starId,
            metric: metric,
            text: text,
            type: this.slug
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/settings';
.loading {
    height: 4px;
    background: white;
    &__animation {
        height: 100%;
        background: linear-gradient(90deg, $secondary, $primary);
        animation: loader 1s infinite;
    }
}
.single-page {
    width: 100%;
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8em 1em;
        background: linear-gradient(-90deg, $secondary, rgba(black,.2));
    }
    &__title {
        color: white;
        font-size: 18px;
        font-weight: 600;
    }
    &__count {
        font-size: 14px;
        font-weight: lighter;
    }
    &__likes {
        color: white;
        img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
            padding: 0.5em;
            cursor: pointer;
            transition: all 0.3s;
            &:active {
                transform: scale(.6);
            }
            &.active {
                background: rgba(black,.2);
            }
        }
    }
    .navigation {
        display: flex;
        justify-content: space-between;
        background: #f0f0f0;
        box-shadow: 0 10px 20px rgba(black, .6);
        width: 100%;
        a {
            cursor: pointer;
            padding: 0.8em 1.8em;
            font-size: 12px;
            text-transform: uppercase;
            color: $secondary;
            transition: all 0.3s;
            &:hover {
                color: black;
            }
        }
    }
}
.search-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(45deg, black, #333333);
    padding: 2em 1em;
    @include from(sm) {
        flex-direction: row;
        padding: 3em 1em;
    }
    .search-input,
    .search-select,
    .search-submit {
        padding: 0.5em;
        height: 50px;
        font-size: 15px;
        border-radius: 2px;
        border: none;
        outline: 0;
        overflow: hidden;
        -webkit-appearance: none;
        box-sizing: border-box;
        transition: all 0.3s;
        margin-bottom: 0.5em;
        @include from(sm) {
            margin-right: 0.5em;
            margin-bottom: 0;
        }
        &:last-child {
            margin-bottom: 0;
            @include from(sm) {
                margin-right: 0;
            }
        }
    }
    .search {
        &-input {
            width: 100%;
            @include from(sm) {
                width: 70%;
            }
        }
        &-select {
            width: 100%;
            -webkit-appearance: none;
            -moz-appearance: none;
            @include from(sm) {
                width: 29.5%;
            }
        }
        &-submit {
            cursor: pointer;
            width: 100%;
            color: $secondary;
            font-weight: bold;
            background: #f0f0f0;
            transition: all 0.3s;
            @include from(sm) {
                width: 29.5%;
            }
            &:hover {
                background: $secondary;
                color: white;
            }
        }
    }
}
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    background: white;
    min-height: 100vh;
    overflow-x: hidden;
    &__item {
        position: relative;
        line-height: 19px;
        border-bottom: 1px solid rgba(black,.08);
        cursor: pointer;
        transition: all 0.3s;
        &:active {
            transform: scale(.95);
        }
        &.active {
            transform: translateX(-20%);
        }
    }
    &__element {
        padding: 2em;
    }
    &__options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        border-bottom: 1px solid rgba(black,.08);
        transform: translateX(100%);
        width: 20%;
    }
    &__likes {
        cursor: pointer;
        animation: likes-out 0.6s;
    }
    .liked {
        animation: likes 0.6s;
    }
    &__metric {
        display: block;
        color: $secondary;
        text-transform: uppercase;
        font-size: 11px;
    }
}

@keyframes loader {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

@keyframes likes {
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes likes-out {
    0% {
        transform: scale(1);
    }
    20% {
        transform: scale(0.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>
