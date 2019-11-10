<template>
    <div class="wrap" v-if="!loading && orders.length !== 0">
        <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-toolbar
                            color="primary"
                            dark
                    >
                        <v-toolbar-title>Settings</v-toolbar-title>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-list
                            subheader
                            two-line
                            flat
                    >
                        <v-subheader>Hangout notifications</v-subheader>

                            <v-list-item
                                v-for="(order, i) in orders"
                                :key="i"
                            >
                                <template>
                                    <v-list-item-action>
                                        <v-checkbox
                                            :input-value="order.done"
                                            @change="markDone(order)"
                                            :disabled="order.done"
                                            color="success"
                                        ></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>{{order.name}}</v-list-item-title>
                                        <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn
                                            :to="'/ad/' + order.adId"
                                            class="primary"
                                        >Open</v-btn>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>

                    </v-list>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else-if="!loading && orders.length === 0">
        <v-container>
            <v-layout row>
                <v-flex class="text-center">
                    <h1 class="text--secondary">You have on orders</h1>
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
    import AuthGuard from '../../router/auth-guard'

    export default {
        name: "Orders",
        computed: {
            loading () {
                return this.$store.getters.loading
            },
            orders () {
                return this.$store.getters.orders
            }
        },
        methods: {
            markDone(order) {
                this.$store.dispatch('markOrderDone', order.key)
                    .then(() => {
                        order.done = true
                    })
                    .catch(() => {})
            }
        },
        created () {
            this.$store.dispatch('fetchOrders')
        },
        beforeRouteEnter: AuthGuard
    }
</script>

<style scoped>

</style>