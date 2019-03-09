<template>
    <div class="container">
        <div v-if="loading" class="text-center">
            <!-- <b-spinner label="Spinning" /> -->
            <b-spinner type="grow" label="Spinning" />
            <!-- <b-spinner variant="primary" label="Spinning" />
            <b-spinner variant="primary" type="grow" label="Spinning" />
            <b-spinner variant="success" label="Spinning" />
            <b-spinner variant="success" type="grow" label="Spinning" /> -->
        </div>
        <div v-else class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Load up some swapi data </div>

                    <div class="card-body">
                        <b-list-group>
                            <b-list-group-item v-for="person in people" :key="person.name">
                                {{ person.name }}
                            </b-list-group-item> 
                        </b-list-group>
                    </div>
                    <b-button @click="getNextSwapiPeople()" variant="success">Button</b-button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/js/api';

    export default {
        data() {
            return {
                loading: true,
                people: [],
                pageCount: 1
            }
        },
        mounted() {
            this.getSwapiPeople()
        },
        methods: {
            async getSwapiPeople() {
                try {
                    const people = await api.getSwapiPeople();
                    console.log(people)
                    this.people = people.data.results;
                    this.loading = false;
                } catch(err) {
                    this.loading = false;
                    throw new Error(err.message);
                }
            },
            async getNextSwapiPeople(){
                this.pageCount++
                try {
                    const people = await api.getNextSwapiPeople(this.pageCount);
                    console.log("Next", people);
                    this.people = people.data.results;
                    this.loading = false;
                } catch (err) {
                    this.loading = false;
                    throw new Error(err)
                }
            }
        }
    }
</script>
