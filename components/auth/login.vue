<template>
<v-app>
  <v-content>
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="py-5 my-5"
      >
        <v-col
          class="py-5 my-5"
          cols="12"
          xs="12"
          sm="8"
          md="6"  
          lg="4"          
        >
          <v-card class="elevation-12 my-5">
            <v-toolbar
              color="teal"
              dark
            >
              <v-toolbar-title>{{ $t('signin') }}</v-toolbar-title>   
              <v-spacer></v-spacer>
              <v-btn text small v-if="$i18n.locale != 'en'" :to="switchLocalePath('en')">English</v-btn>  
              <v-btn text small v-if="$i18n.locale != 'ru'" :to="switchLocalePath('ru')">Русский</v-btn>  
              <v-btn text small v-if="$i18n.locale != 'fi'" :to="switchLocalePath('fi')">Suomen</v-btn>      
            </v-toolbar>
            <v-form
              @submit.prevent="authenticate()" 
              ref="form"    
              lazy-validation
            >
              <v-card-text>
                <v-text-field
                  :label="$t('email')"
                  prepend-icon="mdi-account"
                  type="email"
                  v-model="form.email"
                  :rules="emailRules"
                  required
                  color="teal"
                  :disabled="$store.state.auth.loading"
                ></v-text-field>

                <v-text-field
                  id="password"
                  :label="$t('password')"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="form.password"
                  :rules="passwordRules"
                  required
                  color="teal"
                  :disabled="$store.state.auth.loading"
                ></v-text-field>
              </v-card-text>

             <v-card-actions>  

               <v-btn icon color="teal" :to="localePath('/')">
                <v-icon>
                  mdi-arrow-left
                </v-icon>
               </v-btn>   
                             
                  <div class="flex-grow-1"></div>
                  <v-btn 
                    color="teal"
                    type="submit"
                   :disabled="$store.state.auth.loading"
                  >{{ $t('signin') }}</v-btn>


              </v-card-actions>

              <v-progress-linear
                v-if="$store.state.auth.loading"
                indeterminate
                color="teal"
              ></v-progress-linear>
             
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="errorsFromServer.status"
        :timeout="6000"
        :top="true"
        color="error"
      >{{ errorsFromServer.messages }}
      <v-btn
        color="white"
        text
        @click="errorsFromServer.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-snackbar>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
  export default {
   name: 'login', 
   layout: 'dashboard',
    data() {
      return {
              form: {
                  email: '',
                  password: ''
              },    
              emailRules: [
                v => !!v || 'Введите E-mail',
                v => /.+@.+\..+/.test(v) || 'Некорректный E-mail',
              ],
              passwordRules: [
                v => !!v || 'Введите пароль',
              ],
      }
    },
    computed: {
      errorsFromServer: function () {
          return this.$store.state.auth.errors
      }
    },
    created() {
      console.log(this.$i18n.locale)
    },
    methods: {
      authenticate() {
        if (this.validate()) {
          this.$store.dispatch('auth/login', this.form)
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          return true
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