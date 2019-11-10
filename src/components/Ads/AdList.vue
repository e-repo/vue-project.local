<template>
    <div class="wrap" v-if="!loading && myAds.length !== 0">
        <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h1 class="text--secondary mb-3">My ads</h1>
                    <v-card
                        v-for="(ad, i) in myAds"
                        :key="i"
                        class="elevation-10 mb-3"
                    >
                        <v-layout>
                            <v-flex xs4>
                                <v-img
                                    :src="ad.imageSrc"
                                    height="150px"
                                >
                                </v-img>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-text>
                                    <h2 class="text--primary">{{ad.title}}</h2>
                                    <p>{{ad.description}}</p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="info"
                                        :to="'/ad/' + ad.id"
                                    >Open</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else-if="!loading && myAds.length === 0">
        <v-flex sx-12 class="text-center">
            <h1 class="text-primary">You have no ads</h1>
        </v-flex>
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
    import AuthGuard from '../../router/auth-guard'

    export default {
        name: "AdList",
        computed: {
            myAds () {
                return this.$store.getters.myAds
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        beforeRouteEnter: AuthGuard
    }
</script>

<style scoped>

</style>