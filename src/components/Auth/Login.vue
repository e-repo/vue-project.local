<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validation>
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
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :disabled="!valid"
                            color="primary"
                            @click="onSubmitHandler"
                        >Login</v-btn>
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
                    v => (v.length >= this.minLengthPassword) || `Name must be equal or more then ${this.minLengthPassword} characters`,
                    v => (v.length <= this.maxLengthPassword) || `Name must be less than ${this.maxLengthPassword} characters`,
                ],
                valid: false,
            }
        },
        methods: {
            onSubmitHandler () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }

                    console.log(user)
                }
            }
        }
    }
</script>

<style scoped>

</style>