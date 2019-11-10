<template>
    <div class="wrap" v-if="!loading">
        <v-container fluid>
            <v-layout>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(ad, i) in promoAds"
                                :key="i"
                                :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-md>
            <v-layout wrap justify-center>
                <v-flex
                    xs12 sm6 md3
                    v-for="(ad, i) in ads"
                    :key="i"
                >
                    <v-card class="mx-auto" max-width="400">
                        <v-img
                            class="white--text"
                            height="200px"
                            max-width="344"
                            :src="ad.imageSrc"
                        >
                            <v-card-title class="align-end fill-height">{{ad.title}}</v-card-title>
                        </v-img>

                        <v-card-text>
                            <span>{{ad.title}}</span><br>
                            <span class="text--primary">
                                <span>{{ad.description}}</span>
                            </span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
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
    export default {
        name: "Home",
        computed: {
            promoAds () {
                return this.$store.getters.promoAds
            },
            ads () {
                return this.$store.getters.ads;
            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background-color: rgba(0,0,0, .3);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>