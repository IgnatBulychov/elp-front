<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="add"
          ref="form"
        >
          <v-text-field
            v-model="advantage.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.advantage.loading"
            label="Описание"
          ></v-text-field>

           <v-text-field
            v-model="advantage.icon"
            :rules="iconRules"
            required
            :disabled="$store.state.advantage.loading"
            label="Значек"
          ></v-text-field>

          <span class="my-2">
            See <a href="https://materialdesignicons.com/">materialdesignicons.com</a> 
          </span><br> 
          
          <v-btn
            @click="$router.push('/dashboard/advantages')"  
            color="secondary"
            :disabled="$store.state.advantage.loading"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            :disabled="$store.state.advantage.loading"
          >Добавить</v-btn>

        </v-form>
      </v-card-text>
    </v-card>      
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
  name: 'newAdvantage',
  components: {
    serverSideErrors
  },
  data() {
      return {
          advantage: {
              description: '',
              icon: ''
          },
          descriptionRules: [
            v => !!v || 'Описание - обязательное поле',
            v => (v && v.length <= 256) || 'Описание слишком длинное',
          ],
          iconRules: [
            v => !!v || 'Значек - обязательное поле',
            v => (v && v.length <= 256) || 'Поле "значек" слишком длинное',
          ]
      }
  },
  computed: {
      errorsFromServer: function () {
          return this.$store.state.category.errors
      }
  },
  methods: {
    add() {
      let app = this      
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("advantage", JSON.stringify(app.advantage))
        app.$store.dispatch('advantage/newAdvantage', formData)  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('advantage/loadingDeactivate')
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