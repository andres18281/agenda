import Vue from 'vue';  
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import App from './components/Principal.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Task from './components/App.vue';
import VueMoment from 'vue-moment';
import moment from 'moment';




import { BootstrapVue, IconsPlugin,ModalPlugin } from 'bootstrap-vue';
Vue.use(ModalPlugin);
Vue.use(VueMoment);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueCookies);
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/task', name: 'task', component: Task },
    //{ path: '/bar/:id', name: 'bar', component: Bar }
  ]
})
Vue.use(VueRouter);
new Vue({
  router,
  //vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app');
