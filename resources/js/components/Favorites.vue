<template>
    <div class="col-md-6 testref">
        <div class="card">
            <div class="card-header">Ventus Personae<small style="float:right; vertical-align: middle;">click to edit</small></div>

            <div class="card-body">
                <div v-if="loading" class="text-center">
                    <b-spinner style="margin-top:50px;" type="grow" label="Spinning" />
                </div>
                <div v-else>
                <b-list-group>
                    <b-list-group-item v-if="favorites.length === 0">
                        <em>none selected</em>
                    </b-list-group-item>
                    <b-list-group-item 
                        href="#" 
                        v-else 
                        v-for="person in favorites" 
                        :key="person.name">
                        <div class="d-flex justify-content-between align-items-center">
                            <span style="width:85%" @click.prevent="edit(person)">
                            {{ person.name }}
                                <!-- <i 
                                    @click="edit(person)" 
                                    class="fas fa-pen" 
                                    style="cursor:pointer;">
                                </i> -->
                            </span>
                                <i 
                                    @click.prevent="removeFavorite(person.id)" 
                                    class="fas fa-minus" 
                                    style="cursor:pointer; margin-right:10px; z-index:100;">
                                </i>
                        </div>
                    </b-list-group-item> 
                </b-list-group>
                </div>
            </div>
        </div>

        <edit-modal ref="editmodal">
            <!-- <h1 slot="header">{{ editablePerson.name }}</h1> -->

            <div slot="content">
                <div class="mt-2">Name:</div>
                <b-form-input v-model="editablePerson.name" type="text" />
                <div class="mt-2">Hair Color:</div>
                <b-form-input v-model="editablePerson.hair_color" type="text" />
                <div class="mt-2">Mass: {{ editablePerson.mass }}</div>
                <b-form-input v-model="editablePerson.mass" type="text" />
                <div class="mt-2">Height: {{ editablePerson.height }}</div>
                <b-form-input v-model="editablePerson.height" type="text" />
            </div>

            <b-button 
                slot="buttonleft" 
                class="mt-3" 
                variant="outline-danger" 
                @click="$refs.editmodal.hideModal()">Close</b-button>
            <b-button 
                slot="buttonright" 
                class="mt-3" 
                variant="outline-success" 
                @click="save()">Save</b-button>
        </edit-modal>

    </div>
</template>
<script>
import EditModal from '@/js/components/EditModal.vue';
import api from '@/js/api';

export default {
    components: {
        'edit-modal' : EditModal,
    },
    model: {
        prop: 'favorites'
    },
    props: {
        favorites: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // TODO: create a clone of this object so that I can preserve a cached version of the original
            // in order to restore data on a canceled edit
            editablePerson: {},
        }
    },
    methods: {
        edit(person) {
            this.editablePerson = person;
            this.$refs.editmodal.showModal();
        },
        async removeFavorite(id) {
            try {
                const response = await api.removeFavorite(id);
                this.$emit('deletion-successful');
                this.$emit('alert');
            } catch (err) {
                throw new Error(err.message);
            }
        },
        async save() {
            try {
                const response = await api.updateFavorite(this.editablePerson);
                this.$refs.editmodal.hideModal();
                this.$emit('alert');
            } catch (err) {
                throw new Error(err.message);
            }
        } 
    }
}
</script>