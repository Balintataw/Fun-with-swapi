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
    let isAuthenticated = store.getters.isAuthenticated
    console.log("AUTH?", isAuthenticated)

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