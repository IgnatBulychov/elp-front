<template>
  <div>
    <v-card>
        <v-form
          @submit.prevent="save()"
          ref="form"
        > 
            <v-card-text v-if="settings">
                <v-text-field
                    v-model="settings.title"
                    :rules="rules.title"
                    :disabled="$store.state.settings.loading"
                    :label="$t('title')"
                ></v-text-field>

                <v-text-field
                    v-model="settings.subtitle"
                    :rules="rules.subtitle"
                    :disabled="$store.state.settings.loading"
                    :label="$t('subtitle')"
                ></v-text-field>

                <a class="text--secondary">{{ $t('add-main-img') }}</a> <br>

                <v-btn v-if="!settings.file" @click.stop="dialog = true" outlined class="mb-2" color="teal" :disabled="$store.state.settings.loading"> 
                    <v-icon class="mr-3">mdi-image-plus</v-icon> {{ $t('add') }}
                </v-btn>

                <v-dialog v-model="dialog" scrollable max-width="90%">
                    <selectFile @imageSelected="setImage" @cancel="dialog = false"/> 
                </v-dialog>
                
               <v-row>
                   <v-col cols="12" sm="6">
                        <v-card v-if="settings.file" >
                            <v-img max-height="150px" :src='settings.file'></v-img>
                        <v-card-actions>
                            <v-spacer></v-spacer>             
                                <v-btn @click="removeImage()" 
                                class="mx-2"
                                fab
                                small
                                icon
                                color="error"
                                :disabled="$store.state.settings.loading"
                                >
                                    <v-icon dark>mdi-delete-outline</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                   </v-col>
               </v-row>     

                <v-text-field
                    v-model="settings.about"
                    :rules="rules.about"
                    :disabled="$store.state.settings.loading"
                    :label="$t('about')"
                ></v-text-field>

                <v-text-field
                    v-model="settings.phone"
                    :rules="rules.phone"
                    type="number"
                    :disabled="$store.state.settings.loading"
                    :label="$t('phone')"
                    prepend-inner-icon="mdi-plus"
                ></v-text-field>

                <v-text-field
                    v-model="settings.email"
                    :rules="rules.email"
                    :disabled="$store.state.settings.loading"
                    :label="$t('email')"
                ></v-text-field>

                <v-text-field
                    v-model="settings.viber"
                    :rules="rules.phone"
                    type="number"
                    :disabled="$store.state.settings.loading"
                    label="Viber"
                    prepend-inner-icon="mdi-plus"
                ></v-text-field>

                <v-text-field
                    v-model="settings.telegram"
                    :rules="rules.phone"
                    type="number"
                    :disabled="$store.state.settings.loading"
                    label="Telegram"
                    prepend-inner-icon="mdi-plus"
                ></v-text-field>

                <v-text-field
                    v-model="settings.whatsapp"
                    :rules="rules.phone"
                    type="number"
                    :disabled="$store.state.settings.loading"
                    label="Whatsapp"
                    prepend-inner-icon="mdi-plus"
                ></v-text-field>

                <v-text-field
                    v-model="settings.facebook"
                    :rules="rules.url"
                    :disabled="$store.state.settings.loading"
                    label="facebook"
                ></v-text-field>

                <v-text-field
                    v-model="settings.instagram"
                    :rules="rules.url"
                    :disabled="$store.state.settings.loading"
                    label="Instagram"
                ></v-text-field>

                <v-textarea
                    v-model="settings.map"
                    :rules="rules.map"
                    :disabled="$store.state.settings.loading"
                >
                    <template v-slot:label>
                    <div>
                        {{ $t('map') }}
                    </div>
                    </template>
                </v-textarea>               

                <v-btn
                    type="submit" 
                    color="teal"
                    :disabled="$store.state.settings.loading"
                >  {{ $t('save') }} </v-btn>
            </v-card-text>
        </v-form>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
import selectFile from '~/components/dashboard/files/selectFile.vue'

export default {
    name: 'settings',
    components: {
        serverSideErrors, selectFile
    },
    data() {
        return {
            selectedFile: null,
            dialog: false,
            rules: {
                title: [
                    v => (v.length <= 64) || this.$t('title-max'),
                ],
                subtitle: [
                    v => (v.length <= 2048) || this.$t('subtitle-max'),
                ],
                about: [
                    v => (v.length <= 4048) || this.$t('about-max'),
                ],
                phone: [
                    v => (v.length <= 20) || this.$t('phone-max'),
                ],
                email: [
                    v => (v.length <= 128) || this.$t('email-max'),
                    v => {
                        if(v.length > 0) {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || this.$t('email-correct')
                        }
                    }
                ],
                url: [
                    v => (v.length <= 128) || this.$t('url-max'),
                ],
                map: [
                    v => (v.length <= 4048) || this.$t('map-max'),
                ]
            }
        }
    },
    mounted() {
      this.$store.dispatch('settings/getSettings')
    },    
    computed: {
        settings() {
          return this.$store.state.settings.settings
        },
        errorsFromServer: function () {
            return this.$store.state.settings.errors
        }
    },
    methods: {
        save() {
            let app = this      
            if (this.$refs.form.validate()) { 
                const formData = new FormData();
                if (this.settings.file) {
                    app.settings.file_id = this.settings.file.id
                }  else {
                    app.settings.file_id = null
                }        
                formData.append("settings", JSON.stringify(app.settings))
                app.$store.dispatch('settings/updateSettings', formData)  
                this.$refs.form.resetValidation()
            } else {
                this.$store.commit('settings/loadingDeactivate')
            }
        },
        setImage(img) {
            this.settings.file = img
            this.dialog = false
        },
        removeImage() {
            this.settings.file = null
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>