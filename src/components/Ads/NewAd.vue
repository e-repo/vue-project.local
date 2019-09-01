<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary" mb3>Create new ad</h1>
                <v-form v-model="valid" ref="form" lazy-validation>
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
                <img src="https://via.placeholder.com/400x300/OOOOOO/FFFFFF?text=Image" height="150" alt="">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "NewAd",
        data: () => ({
                title: '',
                description: ''
        })
    }
</script>

<style scoped>

</style>