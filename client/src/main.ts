import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification';
import store from './store';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false
Vue.use(Toast, {});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
