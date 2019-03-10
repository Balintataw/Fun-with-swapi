import Vue    from 'vue';
import Router from 'vue-router';
import store  from '@/js/store';

import Auth from '@/js/pages/Auth.vue';
import Home from '@/js/pages/Home.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
        { path: '/auth', name: 'auth', component: Auth },
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // you could define your own authentication logic with token
    let isAuthenticated = store.getters.isAuthenticated
    console.log("AUTH?", isAuthenticated)
    // check route meta if it requires auth or not
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({
                path: '/auth',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;