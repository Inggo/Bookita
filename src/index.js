import './style.scss'
import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.component('b-logo', require('./components/Logo.vue').default)
Vue.component('b-database', require('./components/Database.vue').default)

var app = new Vue({
  el: '#bookita',
  data: {
    title: process.env.TITLE,
    search: ''
  }
})
