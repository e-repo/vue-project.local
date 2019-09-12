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
                >
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout class="mt-3">
            <v-flex xs-12 sm6 offset-sm3>
                <img src="" height="100" alt="">
            </v-flex>
        </v-layout>
        <v-layout class="mt-3">
            <v-flex xs-12 sm6 offset-sm3>
                <v-switch
                    v-model="promo"
                    label="Add to promo?"
                ></v-switch>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs-12 sm6 offset-sm3>
                <v-spacer></v-spacer>
                <v-btn
                    class="success"
                    @click="createAd"
                    :disabled="!valid"
                >Create ad</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "NewAd",
        data: () => ({
            title: '',
            description: '',
            promo: false,
            valid: false
        }),
        methods: {
            createAd () {
                if (this.$refs.form.validate()) {
                    // logic
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        imageSrc: 'https://s14.stc.all.kpcdn.net/share/i/12/10240851/inx960x640.jpg',
                        imageCardSrc: 'https://s14.stc.all.kpcdn.net/share/i/12/10240851/inx960x640.jpg'
                    }

                    this.$store.dispatch('createAd', ad)
                }
            }
        }
    }
</script>

<style scoped>

</style>