<template>
<v-app>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="teal"
              dark
              flat
            >
              <v-toolbar-title>Вход</v-toolbar-title>              
            </v-toolbar>
            <v-form 
              @submit.prevent="authenticate()" 
              ref="form"    
              lazy-validation
            >
              <v-card-text>
                <v-text-field
                  label="E-mail"
                  name="login"
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
                  label="Пароль"
                  name="password"
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

               <v-btn icon color="teal" :to="{path:'/'}">
                <v-icon>
                  mdi-arrow-left
                </v-icon>
               </v-btn>   
                             
                  <div class="flex-grow-1"></div>
                  <v-btn 
                    color="teal"
                    type="submit"
                    value="Login"
                   :disabled="$store.state.auth.loading"
                  >Enter</v-btn>


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