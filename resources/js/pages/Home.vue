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
                    <div class="card-header">Dramatis Personae</div>

                    <div class="card-body">
                        <b-list-group>
                            <b-list-group-item v-for="person in people" :key="person.name">
                                {{ person.name }}
                            </b-list-group-item> 
                        </b-list-group>
                    </div>
                    <b-row class="justify-content-md-center">
                        <b-button @click="getPrevSwapiPeople()" variant="success">Prev</b-button>
                        <b-button @click="getNextSwapiPeople()" variant="success">Next</b-button>
                    </b-row>
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
            },
            async getPrevSwapiPeople(){
                this.pageCount--
                if(this.pageCount <=1 ) this.pageCount == 1;
                try {
                    const people = await api.getNextSwapiPeople(this.pageCount);
                    console.log("Prev", people);
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
