<template>
    <div class="wrap" v-if="!loading">
        <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-img :src="ad.imageSrc" height="300px"></v-img>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <add-edit-ad-modal :ad="ad" v-if="isOwner"></add-edit-ad-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
    <div v-else>
        <v-flex sx-12 class="text-center">
            <v-progress-linear
                    indeterminate
                    color="primary"
            ></v-progress-linear>
        </v-flex>
    </div>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
    name: "Ad",
    /**
     * Получаем id через router
     * В файле router.js для роута (path: '/ad/:id')
     * установленно свойство (props: true)
     */
    props: ['id'],
    computed: {
        ad () {
            const id = this.id; // пример доступа к props: ['id']
            return this.$store.getters.adById(id)
        },
        loading () {
            return this.$store.getters.loading
        },
        isOwner () {
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        'add-edit-ad-modal': EditAdModal
    }
}
</script>

<style scoped>

</style>