<template>
    <v-dialog
            v-model="dialog"
            max-width="400"
    >
        <template v-slot:activator="{on}">
            <v-btn
                    class="primary flat"
                    v-on="on"
            >Buy
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Do you wan't to buy it?</v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-text-field
                        label="Your name"
                        name="name"
                        type="text"
                        v-model="name"
                ></v-text-field>
                <v-text-field
                        label="Your phone"
                        name="phone"
                        type="text"
                        v-model="phone"
                ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn
                        color="info"
                        text
                        @click="onClose"
                        :disabled="localLoading"
                >
                    Close
                </v-btn>

                <v-btn
                        color="success"
                        text
                        @click="onSave"
                        :disabled="localLoading"
                        :loading="localLoading"
                >
                    Buy it!
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['ad'],
        name: "EditAdModal",
        data () {
            return {
                dialog: false,
                name: '',
                phone: '',
                localLoading: false
            }
        },
        methods: {
            onClose () {
                this.name = ''
                this.phone = ''
                this.dialog = false
            },
            onSave () {
                if (this.phone !== '' && this.name !== '') {
                    this.localLoading = true
                    this.$store.dispatch('createOrder', {
                        name: this.name,
                        phone: this.phone,
                        adId: this.ad.id,
                        ownerId: this.ad.ownerId
                    })
                    .finally(() => {
                        this.name = ''
                        this.phone = ''
                        this.localLoading = false
                        this.dialog = false
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>