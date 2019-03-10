// I like to make plugins from vuex store modules
// allows use of $user anywhere
import store from '@/js/store'

export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                "$user"() {
                    var user = store.getters['user'];
                    user.isAuthenticated = store.getters['isAuthenticated'];
                    user.logout = function() {
                        return store.dispatch('logout');
                    };
                    user.register = function(userData) {
                        return store.dispatch('register', userData)
                    }
                    user.login = function(userData) {
                        return store.dispatch('login', userData);
                    }
                    return user;
                }
            }
        });
    }
};

