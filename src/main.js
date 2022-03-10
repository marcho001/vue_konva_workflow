import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueKonva from 'vue-konva'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'

Vue.use(ElementUI)
Vue.use(VueKonva)

Vue.config.productionTip = false
import './index.css'
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
