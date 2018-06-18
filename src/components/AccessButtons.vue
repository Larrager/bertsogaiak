<template>
<div class="access-buttons">
  <div class="access-buttons__item">
    <router-link :to="{ name: 'signUp' }">
      <img src="../assets/user-o.svg" alt="">
      <h3>Izena eman</h3>
      <div class="access-buttons__text">Gustuko gaiak zure gustora kudeatzeko izena eman</div>
    </router-link>
  </div>
  <div class="access-buttons__item">
    <router-link :to="{ name: 'faq' }">
      <img src="../assets/faq-o.svg" alt="">
      <h3>Ohiko galderei erantzunak</h3>
      <div class="access-buttons__text">Ikusi BertsoGaiak nola erabili dezakezun</div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../scss/settings';
.access-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(45deg, #222222, #333333);
    color: white;
    padding: 1em;
    @include from(sm) {
        flex-direction: row;
    }
    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        a {
            padding: 3em 2em;
            border-radius: 3px;
            transition: all 0.5s;
            &:hover {
                background: rgba(black,.2);
                color: white;
            }
        }
        &:nth-child(1) {
            border-bottom: 1px solid rgba(white,.3);
            @include from(sm) {
                border: none;
            }
        }
        @include from(sm) {
            margin-bottom: 0;
        }
        a {
            text-decoration: none;
        }
    }
}
</style>
