<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    prepend-icon="mdi-account"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    :rules="emailRules"
                                    v-model="email"
                            ></v-text-field>

                            <v-text-field
                                    prepend-icon="mdi-lock"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    :rules="passRules"
                                    :counter="maxLengthPassword"
                                    v-model="password"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="mdi-lock"
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    :rules="confirmPassRules"
                                    :counter="maxLengthPassword"
                                    v-model="confirmPassword"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="!valid || loading"
                                color="primary"
                                :loading="loading"
                                @click="onSubmitHandler"
                        >Registration</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "Login",
        data () {
            return {
                minLengthPassword: 6,
                maxLengthPassword: 16,
                email: '',
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^[0-9a-z-.]+@[0-9a-z-]{2,}.[a-z]{2,}$/i.test(v) || 'E-mail must be valid',
                ],
                password: '',
                passRules: [
                    v => !!v || 'Password is required',
                    v => (v.length >= this.minLengthPassword) || `Password must be equal or more then ${this.minLengthPassword} characters`,
                    v => (v.length <= this.maxLengthPassword) || `Password must be less than ${this.maxLengthPassword} characters`,
                ],
                confirmPassword: '',
                confirmPassRules: [
                    v => !!v || 'Password is required',
                    v => (v === this.password) || 'Password should match',
                ],
                valid: false,
            }
        },
        computed: {
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
            onSubmitHandler () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }

                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(e => {console.log(e)})
                }
            }
        }
    }
</script>

<style scoped>

</style>