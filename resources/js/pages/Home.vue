<template>
    <div class="container">
        <b-alert v-model="showAlert" dismissible style="position:absolute; top:65px; right:50px;">{{ alertText }}</b-alert>
        <b-nav-form style="margin-top:15px;">
            <b-form-input v-model="searchTerm" size="sm" class="mr-sm-2" type="text" placeholder="Search" />
            <b-button size="sm" class="my-2 my-sm-0" @click="searchSwapiPeople()">Search</b-button>
        </b-nav-form>
        <div class="row" style="margin-top:20px;">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Dramatis Personae</div>

                    <div class="card-body">
                        <div v-if="loading" class="text-center">
                            <b-spinner style="margin-top:50px;" type="grow" label="Spinning" />
                        </div>
                        <div v-else-if="people.length === 0">
                            <em>No data available</em>
                        </div>
                        <b-list-group v-else>
                            <b-list-group-item 
                                href="#" 
                                v-for="(person) in people" 
                                :key="person.name">
                                <div class="d-flex w-100 justify-content-between align-items-center">
                                    {{ person.name }}
                                    <i 
                                        v-b-tooltip.hover :title="`Add ${person.name} to Favorites`"
                                        @click="addToFavorites(person)" 
                                        class="fas fa-plus" 
                                        style="cursor:pointer;">
                                    </i>
                                </div>
                            </b-list-group-item> 
                        </b-list-group>
                    </div>
                    <b-row align-h="center" style="margin-bottom:20px;">
                        <b-col cols="4" style="z-index:5;">
                            <b-row align-h="center">
                                <b-button @click="getPrevSwapiPeople()" variant="success">Prev</b-button>
                            </b-row>
                        </b-col>
                        <b-col cols="4" style="z-index:5;">
                            <b-row align-h="center">
                                <b-button @click="getNextSwapiPeople()" variant="success">Next</b-button>
                            </b-row>
                        </b-col>
                        <b-col style="position:absolute; right:0px; bottom: 30px;">
                            <b-row align-h="center" align-v="center">
                                <small>Page: {{ pageCount }}</small>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </div>

            <favorites 
                v-model="favorites" 
                :loading="loading" 
                v-on:alert="showAlert = true; alertText = 'Success'"
                v-on:deletion-successful="getFavorites" />

        </div>
    </div>
</template>

<script>
    import Favorites from '@/js/components/Favorites.vue';

    import api from '@/js/api';

    export default {
        components: {
            'favorites' : Favorites,
        },
        data() {
            return {
                loading: true,
                people: [],
                favorites: [],
                pageCount: 1,
                searchTerm: '',
                showAlert: false,
                alertText: 'Coming Soon'
            }
        },
        mounted() {
            this.getSwapiPeople();
        },
        methods: {
            async getSwapiPeople() {
                try {
                    const people = await api.getSwapiPeople();
                    console.log(people)
                    this.people = people.data.results;
                    const favorites = await api.getFavorites();
                    this.favorites = favorites.data

                    this.loading = false;
                } catch(err) {
                    this.loading = false;
                    throw new Error(err.message);
                }
            },
            async getNextSwapiPeople(){
                this.loading = true;
                this.pageCount++
                try {
                    const people = await api.getNextSwapiPeople(this.pageCount);
                    this.people = people.data.results;
                    this.loading = false;
                } catch (err) {
                    this.loading = false;
                    throw new Error(err)
                }
            },
            async getPrevSwapiPeople(){
                this.loading = true;
                this.pageCount--
                if(this.pageCount <=1 ) this.pageCount == 1;
                try {
                    const people = await api.getNextSwapiPeople(this.pageCount);
                    this.people = people.data.results;
                    this.loading = false;
                } catch (err) {
                    this.loading = false;
                    throw new Error(err)
                }
            },
            async addToFavorites(person) {
                api.addToFavorites(person).then(resp => {
                    return this.getFavorites();
                }).catch(err => {
                    console.log("DONEERR", err)
                })
            },
            async getFavorites() {
                try {
                    const favorites = await api.getFavorites();
                    this.favorites = favorites.data;
                } catch(err) {
                    throw new Error(err.message);
                }
            },
            async searchSwapiPeople(term) {
                this.showAlert = true;
                // try {
                //     const results = await api.searchSwapiPeople(term);
                //     console.log("RES", results);
                // } catch (err) {
                //     throw new Error(err.message);
                // }
            }
        }
    }
</script>
