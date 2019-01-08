// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from  'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Base64 from 'js-base64'
import  Lyric from 'lyric-parser'

// Vue.prototype.bus = new Vue()

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

Vue.prototype.$axios = Axios;
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
