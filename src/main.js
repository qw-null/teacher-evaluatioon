// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'lib-flexible/flexible.js'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import qs from 'qs'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(Element);

// window.onresize = setHtmlFontSize
// function setHtmlFontSize () {
//   const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
//   const htmlDom = document.getElementsByTagName('html')[0]
//   htmlDom.style.fontSize = htmlWidth / 10 + 'px'
// }
// setHtmlFontSize()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
