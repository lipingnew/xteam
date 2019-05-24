// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import JIMU from '@baidu/jimu-vue'
import '@baidu/jimu-vue/lib/styles/index.css'
import VueRouter from 'vue-router';
Vue.use(JIMU);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.isSign = localStorage.getItem('isSign');
axios
  .post("/api/sku/getdata", {
    pn: 0,
    rn: 8,
    prod_name: ''
  })
  .then(res => {
    Vue.prototype.$total = res.data.data.all_count;
  })
  .catch(err => { 
    this.$Message.error('服务器出错！');
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
