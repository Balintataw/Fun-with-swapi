import axios from 'axios';
const BASE_API_URL = process.env.MIX_BASE_API_URL;
const BASE_URL = "swapi.test";

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
        return axios.get(`${BASE_API_URL}/people`);
    },
    getNextSwapiPeople(page) {
        return axios.get(`${BASE_API_URL}/people/?page=${page}`);
    },
    searchSwapiPeople(term) {
        // api isnt directly searchable by name, only id, deferred
        return axios.get(`${BASE_API_URL}/people/`)
    },
    addToFavorites(person) {
        return axios.post('http://swapi.test/api/favorites/create', person).then(resp => {
            console.log("RESPONSE", resp)
        }).catch(err => console.log("ERR", err))
    },
    getFavorites() {
        return axios.get('http://swapi.test/api/favorites');
    },
    removeFavorite(id) {
        return axios.post(`http://swapi.test/api/favorites/delete/${id}`);
    },
    updateFavorite(newFavorite) {
        // the id will still be the id of the original record despite other data fields being changed
        console.log("ID", newFavorite.id)
        return axios.post(`http://swapi.test/api/favorites/update/${newFavorite.id}`, newFavorite);
    }
}