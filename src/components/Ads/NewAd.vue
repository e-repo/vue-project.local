<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary" mb3>Create new ad</h1>
                <v-form v-model="valid" ref="form">
                    <v-text-field
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
        
                    <v-textarea
                            label="Ad description"
                            name="description"
                            type="text"
                            required
                            no-resize
                            rows="3"
                            :rules="[v => !!v || 'Description is required']"
                            v-model="description"
                    ></v-textarea>
                    
                </v-form>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs-12 sm6 offset-sm3>
                <v-btn
                    class="white--text warning"
                    @click="fileUpload"
                >
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <input
                    ref="fileUpload"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="onFileChange"
                >
            </v-flex>
        </v-layout>
        <v-layout row class="mt-3">
            <v-flex xs-12 sm6 offset-sm3>
                <img :src="imageSrc" height="100" alt="" v-if="imageSrc">
            </v-flex>
        </v-layout>
        <v-layout row class="mt-3">
            <v-flex xs-12 sm6 offset-sm3>
                <v-switch
                    v-model="promo"
                    label="Add to promo?"
                ></v-switch>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs-12 sm6 offset-sm3>
                <v-spacer></v-spacer>
                <v-btn
                    class="success"
                    @click="createAd"
                    :loading="loading"
                    :disabled="!valid || !image || loading"
                >Create ad</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import AuthGuard from '../../router/auth-guard'

    export default {
        name: "NewAd",
        data: () => ({
            title: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imageSrc: ''
        }),
        methods: {
            createAd () {
                if (this.$refs.form.validate() && this.image) {
                    // logic
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    }

                    this.$store.dispatch('createAd', ad)
                        .then(() => {
                            this.$router.push('/list')
                        })
                        .catch(() => {})
                }
            },
            fileUpload () {
                this.$refs.fileUpload.click()
            },
            onFileChange (event) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    this.imageSrc = reader.result
                }
                this.image = file
            }
        },
        computed: {
            loading () {
                return this.$store.getters.loading
            }
        },
        beforeRouteEnter: AuthGuard
    }
</script>

<style scoped>

</style>