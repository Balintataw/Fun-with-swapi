<template>
    <div class="container">
        <div class="row" style="margin-top:20px;">
            <div class="col-md-6">
                <b-form @reset="onReset" v-if="show">
                    <b-form-group
                        id="exampleInputGroup1"
                        label="Email address:"
                        label-for="exampleInput1"
                    >
                        <b-form-input
                            id="exampleInput1"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Enter email" />
                    </b-form-group>

                    <b-form-group id="exampleInputGroup2" label="Password:" label-for="exampleInput2">
                        <b-form-input
                        id="exampleInput2"
                        type="text"
                        v-model="form.password"
                        required
                        placeholder="Password" />
                    </b-form-group>

                    <b-button @click.prevent="login" variant="primary">Login</b-button>
                    <b-button @click.prevent="register" variant="primary">Sign Up</b-button>
                    <b-button @click="onReset" type="reset" variant="danger">Reset</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            show: true
        }
    },
    methods: {
        login() {
            this.$user.login(this.form).then(() => {
                this.$router.replace('/home');
            });
        },
        register() {
            this.$user.register(this.form).then(() => {
                this.$router.replace('/home');
            });
        },
        onReset(evt) {
            evt.preventDefault()
            this.form.email = ''
            this.form.password = ''
            /* Trick to reset/clear native browser form validation state */
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>