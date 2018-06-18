<template>
<div>
  <headerComponent></headerComponent>
  <div class="faq">
    <h2 class="faq__title">Ohiko galderei erantzunak</h2>

    <p>
      BertsoGaiak hobeto erabiltzeko kontutan izan ondorengoak:
      <ul>
        <li>Inongo irabazi asmorik gabe sortutako zerbitzua da.</li>
        <li>Dokumentazio iturria: bertsozale elkartea</li>
        <li>Aplikazioaren egileak: @sergixnet eta @asiermusa</li>
      </ul>
    </p>

    <p><b>Zertarako izena eman?</b></p>
    <p>Webgunea erabat irekia da, eta izena eman gabe eskuragarri izango dituzu gai guztiak
    atalka banatuak:

    <ul>
      <li>Ofizioak</li>
      <li>Bakarkarkoak - Gaia emanda eta puntu-erantzunak -</li>
    </ul>

    Gustoko dituzun gaiak gordetzeko ordea, login sistema baten bidez (google) zure emaila gordeko da.<br>
    Ez da erabiltzaileen beste daturik eskatuko, ezta emailik bidaliko ere.
    </p>
  </div>
</div>
</template>

<script>
import headerComponent from './Header.vue'

export default {
  name: 'faq',
  components: {
    headerComponent
  },
}
</script>

<style lang="scss">
@import '../scss/settings';
.faq {
    background: white;
    padding: 1em;
    @include from(sm) {
        padding: 4em;
        display: block;
    }
    p {
        margin: 2em 0;
        line-height: 26px;
    }
}
</style>
