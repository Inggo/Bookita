import './style.scss'
import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.component('b-logo', require('./components/Logo.vue').default)

var app = new Vue({
  el: '#bookita',
  data: {
    title: process.env.TITLE,
    search: ''
  }
})
