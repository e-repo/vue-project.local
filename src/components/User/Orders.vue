<template>
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
</template>

<script>
    export default {
        name: "Orders",
        data: () => ({
            orders: [
                {
                    id: 'fd31',
                    name: 'Eugeny',
                    phone: '8-943-233-33-22',
                    adId: '123',
                    done: false
                }
            ],
        }),
        methods: {
            markDone(order) {
                order.done = true
            }
        }
    }
</script>

<style scoped>

</style>