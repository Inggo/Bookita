import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

var app = new Vue({
  el: '#bookita',
  data: {
    title: process.env.TITLE,
    search: ''
  }
})
