<template>
<header class="main-header">
  <router-link :to="{ name: 'home' }">
    <img src="../assets/logo-original.svg" alt="BertsoGaiak" class="main-header__logo">
  </router-link>
</header>
</template>

<script>
export default {
  name: 'headerComponent'
}
</script>

<style lang="scss" scoped>
@import '../scss/settings';
.main-header {
    width: 100%;
    margin: 0;
    text-align: center;
    &__logo {
        width: 120px;
        margin-bottom: 2em;
        @include from(md) {
            width: 200px;
            margin: 2em 0;
        }
    }
}
</style>
