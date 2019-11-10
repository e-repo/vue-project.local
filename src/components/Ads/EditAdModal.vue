<template>
    <v-dialog
            v-model="dialog"
            max-width="400"
    >
        <template v-slot:activator="{on}">
            <v-btn
                class="warning flat"
                v-on="on"
            >Edit
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Edit add</v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-text-field
                        label="Title"
                        name="title"
                        type="text"
                        v-model="editedTitle"
                ></v-text-field>
                <v-textarea
                        label="Description"
                        name="description"
                        type="text"
                        no-resize
                        rows="3"
                        v-model="editedDescription"
                ></v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn
                    color="info"
                    text
                    @click="onCancel"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="success"
                    text
                    @click="onSave"
                >
                    Save
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
                editedTitle: this.ad.title,
                editedDescription: this.ad.description
            }
        },
        methods: {
            onCancel () {
                this.editedTitle = this.ad.title;
                this.editedDescription = this.ad.description
                this.dialog = false
            },
            onSave () {
                if (this.editedDescription !== '' && this.editedTitle !== '') {
                    this.$store.dispatch('updateAd', {
                        title: this.editedTitle,
                        description: this.editedDescription,
                        id: this.ad.id
                    })
                    this.dialog = false
                }
            }
        }
    }
</script>