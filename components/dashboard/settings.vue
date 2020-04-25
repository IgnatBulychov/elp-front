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
                    label="Заголовок"
                ></v-text-field>

                <v-text-field
                    v-model="settings.description"
                    :rules="rules.description"
                    :disabled="$store.state.settings.loading"
                    label="Подзаголовок"
                ></v-text-field>

                <v-text-field
                    v-model="settings.about"
                    :rules="rules.about"
                    :disabled="$store.state.settings.loading"
                    label="Начальный текст"
                ></v-text-field>

                <v-text-field
                    v-model="settings.phone"
                    :rules="rules.phone"
                    type="number"
                    :disabled="$store.state.settings.loading"
                    label="Телефон"
                    prepend-inner-icon="mdi-plus"
                ></v-text-field>

                <v-text-field
                    v-model="settings.email"
                    :rules="rules.email"
                    :disabled="$store.state.settings.loading"
                    label="Email"
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
                        Скрипт карты
                    </div>
                    </template>
                </v-textarea>

                 <v-btn
                    type="submit" 
                    color="teal"
                    :disabled="$store.state.settings.loading"
                >Сохранить</v-btn>
            </v-card-text>
        </v-form>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'settings',
    components: {
        serverSideErrors
    },
    data() {
        return {
            /*settings: {
                title: '',
                description: '',
                about: '',
                phone: '',
                email: '',
                viber: '',
                telegram: '',
                whatsapp: '',
                facebook: '',
                instagram: '',
                map: ''
            },*/ 
            rules: {
                title: [
                    v => (v.length <= 64) || 'Заголовок слишком длинный',
                ],
                description: [
                    v => (v.length <= 2048) || 'Подзаголовок слишком длинный',
                ],
                about: [
                    v => (v.length <= 4048) || 'Текст слишком длинный',
                ],
                phone: [
                    v => (v.length <= 20) || 'Номер телефона слишком длинный',
                ],
                email: [
                    v => (v.length <= 128) || 'E-mail слишком длинный',
                    v => {
                        if(v.length > 0) {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(v) || 'Не корректный E-mail'
                        }
                    }
                ],
                url: [
                    v => (v.length <= 128) || 'Адрес слишком длинный',
                ],
                map: [
                    v => (v.length <= 4048) || 'Скрипт карты слишком длинный',
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
                formData.append("settings", JSON.stringify(app.settings))
                app.$store.dispatch('settings/updateSettings', formData)  
                this.$refs.form.resetValidation()
            } else {
                this.$store.commit('settings/loadingDeactivate')
            }
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>