<template>
    <div class="wrap">
        <v-container fluid>
            <v-layout>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(ad, i) in ads"
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
                            <v-btn color="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                ads: [
                    {
                        title: 'Title1',
                        description: 'description1',
                        promo: false,
                        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                        id: 123
                    },
                    {
                        title: 'Title2',
                        description: 'description2',
                        promo: false,
                        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                        id: 124
                    },
                    {
                        title: 'Title3',
                        description: 'description3',
                        promo: false,
                        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                        id: 125
                    },
                ]
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