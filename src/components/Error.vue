<template>
<div>
  <headerComponent></headerComponent>
  <div class="error">
    <h1>Ez da ezer aurkitu...</h1>
    <p>Ematen du erroreren bat gertatu dela ezin baitugu ezer erakutsi</p>
    <router-link :to="{ name: 'home'}">Hasiera joan</router-link>
  </div>
</div>
</template>

<script>
import headerComponent from './Header.vue'

export default {
  name: 'login',
  components: {
    headerComponent
  },
}
</script>

<style lang="scss">
@import '../scss/settings';
.error {
    text-align: center;
    padding: 5em 0;
}
</style>
