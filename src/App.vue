<template>
<main class="main-section">
  <div class="main-content">
    <router-view></router-view>
  </div>
  <accessButtons></accessButtons>
  <sectionFooter></sectionFooter>
</main>
</template>

<script>
import accessButtons from './components/AccessButtons.vue'
import sectionFooter from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    sectionFooter,
    accessButtons
  }
}
</script>

<style lang="scss">
@import './scss/settings';
.main-section {
    position: relative;
    display: flex;
    flex-direction: column;
}
.main-content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 82px;
    background: url("./assets/background.jpg");
    background-attachment: fixed;
    background-position: center top;
    background-size: cover;
    z-index: 0;
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, $primary, $secondary);
        opacity: 0.9;
        height: 100%;
        width: 100%;
        z-index: -1;
    }
}
</style>
