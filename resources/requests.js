import axios from 'axios';

export default {
    login(payload) {
        return axios.post('admin/login', { email: payload.email, password: payload.password });
    },
    refreshToken() {
        return axios.post('admin/refresh');
    },
    logout() {
        return axios.post('admin/logout');
    },
    getSwapi() {
        return axios.get('admin/me');
    },
}