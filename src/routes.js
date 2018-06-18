import Error from './components/Error.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import ResetPassword from './components/ResetPassword.vue'
import SignUp from './components/SignUp.vue'
import Single from './components/Single.vue'
import Faq from './components/Faq.vue'
import Gogokoak from './components/Gogokoak.vue'

export const routes = [{
    path: '*',
    name: 'error',
    component: Error,
    meta: {
      title: '404 Error'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Hasiera'
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
    meta: {
      title: 'Faq'
    }
  },
  {
    path: '/saioa-hasi',
    name: 'login',
    component: Login,
    meta: {
      title: 'Saioa hasi'
    }
  },
  {
    path: '/pasahitza-berrezarri',
    name: 'resetPassword',
    component: ResetPassword,
    meta: {
      title: 'Pasahitza berreskuratu'
    }
  },
  {
    path: '/izena-eman',
    name: 'signUp',
    component: SignUp,
    meta: {
      title: 'Izena eman'
    }
  },
  {
    path: '/ofizioak',
    name: 'ofizioak',
    component: Single,
    props: {
      singleType: 'Ofizioak',
      slug: 'ofizioak'
    },
    meta: {
      title: 'Ofizioak'
    }
  },
  {
    path: '/gaia-emanda',
    name: 'gaia-emanda',
    component: Single,
    props: {
      singleType: 'Gaia emanda',
      slug: 'gaia-emanda'
    },
    meta: {
      title: 'Gaia emanda'
    }
  },
  {
    path: '/puntu-erantzunak',
    name: 'puntu-erantzunak',
    component: Single,
    props: {
      singleType: 'Puntu-erantzunak',
      slug: 'puntu-erantzunak'
    },
    meta: {
      title: 'Puntu-erantzunak'
    }
  },
  {
    path: '/gogokoak/:type/:title',
    name: 'gogokoak',
    component: Gogokoak,
    meta: {
      title: 'Gogokoak'
    }
  }
]

/*
path: '/admin',
name: 'main',
component: Main,
meta: {
  requiresAuth: true
}, children: [
  {
    path: 'ofizioka',
    name: 'ofizioka',
    component: Ofizioka
  }
]*/
