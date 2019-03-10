import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'vue-web-storage';
import api from '@/js/api';

Vue.use(Vuex);
Vue.use(Storage, {
    driver: 'local',
});

function errorParse(error) {
    let errMessage = "";

    if (error.response.data) {
        if (error.response.data.error) {
            errMessage = error.response.data.error;
        } else if (typeof error.response.data == "object") {
            let errors = error.response.data;
            Object.keys(errors).forEach((err) => {
                console.log({err, errors, email: errors[err]});
                for (let m = 0; m < errors[err].length; m++) {
                    console.log(m);
                    errMessage += errors[err][m] + " ";
                }
            });
        } 
    }

    return errMessage;
}

export default new Vuex.Store({
    state: {
        token: '',
        user: {
            id: null,
            email: null,
            created_at: '',
            updated_at: ''
        }
    },
    getters: {
        isAuthenticated: state => (state.token || Vue.$localStorage.get('token_access_token') ? true : false),
        user: state => state.user
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = {...payload};
        },
        SET_TOKEN(state, payload) {
            Vue.$localStorage.set('token_access_token', payload);
            state.token = payload;
        },
        CLEAR_TOKEN(state) {
            Vue.$localStorage.remove('token_access_token');
            state.token = null;
        },
        CLEAR_USER(state) {
            for (let prop in state.user) {
                state.user[prop] = null;
            }
        },
    },
    actions: {
        login({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                api.login(payload).then(response => {
                    console.log("Login: ", response);
                    commit('SET_TOKEN', response.data.user.token);
                    commit('SET_USER', response.data.user)
                    resolve('Got user info');
                }).catch(error => {
                    console.log("Login error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        register({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                api.register(payload).then(response => {
                    console.log("Registered: ", response);
                    commit('SET_TOKEN', response.data.token);
                    commit('SET_USER', response.data.data);
                    resolve('Got user info');
                }).catch(error => {
                    console.log("Register error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        logout({ commit }) {
            let p = new Promise((resolve, reject) => {
                commit('CLEAR_TOKEN');
                commit('CLEAR_USER');
                resolve('Logged out');
            });

            return p;
        },
    },
});
