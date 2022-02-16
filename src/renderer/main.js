import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './assets/style.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
const os = require('os')
const path = require('path')
const home = os.homedir()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  data: function() {
    return {
      fileDir: path.join(home, '/AppData/LocalLow/yusuiInc/觅长生'),
      isTest: false,
      character: {}
    }
  },
  store,
  template: '<App/>'
}).$mount('#app')
