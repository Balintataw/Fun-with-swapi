import axios from 'axios';
const BASE_SWAPI_API_URL = process.env.MIX_BASE_API_URL;
const BASE_URL = process.env.MIX_BASE_URL;
// const BASE_URL = "http://swapi.test";

export default {
    login(payload) {
        return axios.post(`/api/auth/login`, { email: payload.email, password: payload.password });
    },
    register(payload) {
        return axios.post(`/api/auth/register`, { email: payload.email, password: payload.password });
    },
    logout() {
        // unused
        return axios.post('admin/logout');
    },
    getSwapiPeople() {
        return axios.get(`${BASE_SWAPI_API_URL}/people`);
    },
    getNextSwapiPeople(page) {
        return axios.get(`${BASE_SWAPI_API_URL}/people/?page=${page}`);
    },
    searchSwapiPeople(term) {
        // api isnt directly searchable by name, only id, deferred
        return axios.get(`${BASE_SWAPI_API_URL}/people/`);
    },
    addToFavorites(person) {
        return axios.post(`/api/favorites/create`, person).then(resp => {
        }).catch(err => console.log("ERR", err))
    },
    getFavorites() {
        return axios.get(`/api/favorites`);
    },
    removeFavorite(id) {
        return axios.post(`/api/favorites/delete/${id}`);
    },
    updateFavorite(newFavorite) {
        // the id will still be the id of the original record despite other data fields being changed
        return axios.post(`/api/favorites/update/${newFavorite.id}`, newFavorite);
    }
}