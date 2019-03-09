// import './bootstrap';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'

// Route interface for Vue Router
import Routes from '@/js/routes';
// import Store  from '@/js/store';

// Component File app entry point
import App from '@/js/views/App.vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
// Vue.use(VeeValidate);

const app = new Vue({
    el: '#app',
    router: Routes,
    // store: Store,
    render: h => h(App),
});

export default app;
