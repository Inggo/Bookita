import './style.scss'
import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.component('bkt-logo', require('./components/Logo.vue').default)
Vue.component('bkt-database', require('./components/Database.vue').default)
Vue.component('bkt-search', require('./components/Search.vue').default)

var app = new Vue({
  el: '#bookita',
  data: {
    title: process.env.TITLE
  }
})
