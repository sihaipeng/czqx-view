// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import router from './router'
import qs from 'qs'

//封装axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
let base = process.env.API_ROOT

export const GET = (url,params)=>{
  return axios.get(base + url,{
    params:params
  }).then(res => res.data)
}
export const POST = (url,params)=>{
  return axios.post(base + url,params).then(res => res.data)
}
export const RESTFUL = (url)=>{
  if (url.indexOf('remove') != -1){
    return axios.post(base + url).then(res => res.data)
  }else{
    return axios.get(base + url).then(res => res.data)
  }
}

Vue.prototype.$get = GET
Vue.prototype.$post = POST
Vue.prototype.$restful = RESTFUL
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
