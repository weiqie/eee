// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './server'
import store from './store'
import VueLazyload from 'vue-lazyload'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VDistpicker from 'v-distpicker'
// Vue.component('v-distpicker', VDistpicker)
Vue.use(iView)
Vue.use(api)
Vue.use(VueLazyload, {
  loading: require('./assets/loading.gif')
});
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App,VDistpicker},
  template: '<App/>',
  router,
  store
})

