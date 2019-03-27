import '@mdi/font/scss/materialdesignicons.scss'
import './style.scss'
import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.component('bkt-logo', require('./components/Logo.vue').default)
Vue.component('bkt-database', require('./components/Database.vue').default)
Vue.component('bkt-box', require('./components/Box.vue').default)
Vue.component('bkt-search', require('./components/Search.vue').default)
Vue.component('bkt-results', require('./components/Results.vue').default)
Vue.component('bkt-help', require('./components/Help.vue').default)

var app = new Vue({
  el: '#bookita',
  data: {
    title: process.env.TITLE
  }
})
