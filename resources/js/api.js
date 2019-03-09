import axios from 'axios';
const BASE_URL = process.env.MIX_BASE_API_URL;

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
    getSwapiPeople() {
        return axios.get(`${BASE_URL}/people`);
    },
    getNextSwapiPeople(page) {
        return axios.get(`${BASE_URL}/people/?page=${page}`);
    },
}