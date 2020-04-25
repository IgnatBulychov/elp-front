<template>
  <div> 
        <v-form
          @submit.prevent="add"
          ref="form"
          
        >
          <v-text-field
          color="cyan darken-2"
            v-model="order.name"
            :rules="nameRules"
            required
            :disabled="$store.state.order.loading"
            label="Ваше имя"
          ></v-text-field>

          <v-text-field
          color="cyan darken-2"
            v-model="order.phone"
            :rules="phoneRules"
            required
            :disabled="$store.state.order.loading"
            label="Ваш Телефон"
          ></v-text-field>

          <v-text-field
          color="cyan darken-2"
            v-model="order.email"
            :rules="emailRules"
            required
            :disabled="$store.state.order.loading"
            label="Ваш Email"
          ></v-text-field>

          <v-textarea
          color="cyan darken-2"
            v-model="order.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.order.loading"
          >
            <template v-slot:label>
              <div>
                Комментарий
              </div>
            </template>
          </v-textarea>
          <div width="100%" class="text-center">
            <v-btn
              type="submit"
              color="cyan darken-2" outlined
              :disabled="$store.state.order.loading"
            >Отправить</v-btn>
          </div>
        </v-form>    
    <v-snackbar
      v-model="alert.status"
      :timeout="5000"
      :top="true"
      color="success"
    >
      {{ alert.message }}
      
      <v-btn
        color="white"
        text
        @click="alert.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar> 
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
  name: 'newOrder',
  components: {
    serverSideErrors
  },
  data() {
      return {
          order: {
              name: '',
              phone: '',
              email: '',
              description: ''
          },
          nameRules: [
            v => !!v || 'Введите ваше имя',
            v => (v && v.length <= 128) || 'Имя слишком длинное',
          ],
          phoneRules: [
            v => (v && v.length <= 25) || 'Номер слишком длинный',
          ],
          emailRules: [
            v => (v && v.length <= 128) || 'E-mail слишком длинный',
            v => /.+@.+\..+/.test(v) || 'Некорректный E-mail',
          ],
          descriptionRules: [
            v => !!v || 'Введите комментарий',
            v => (v && v.length <= 2048) || 'Комментарий слишком большой',
          ]         
      }
  },
  computed: {
      errorsFromServer: function () {
          return this.$store.state.order.errors
      },
      alert: function () {
          return this.$store.state.order.success
      }
  },
  methods: {
    add() {
      let app = this      
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("order", JSON.stringify(app.order))
        app.$store.dispatch('order/newOrder', formData)  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('order/loadingDeactivate')
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