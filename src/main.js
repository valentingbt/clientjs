import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
// import VueNativeSock from 'vue-native-websocket'
// import store from './store/store'

Vue.config.productionTip = false

// Vue.use(Vuex);
// Vue.use(VueNativeSock, 'wss://backend.cleverapps.io', { store: store })

new Vue({
  render: h => h(App),
}).$mount('#app')
