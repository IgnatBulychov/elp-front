<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="add"
          ref="form"
        >
          <v-text-field
            v-model="category.title"
            :rules="titleRules"
            required
            :disabled="$store.state.category.loading"
            label="Название категории"
          ></v-text-field>

          <v-btn
            @click="$router.push('/dashboard/categories')"  
            color="secondary"
            :disabled="$store.state.category.loading"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            :disabled="$store.state.category.loading"
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
  name: 'newCategory',
  components: {
    serverSideErrors
  },
  data() {
      return {
          category: {
              title: ''
          },
          titleRules: [
            v => !!v || 'Название - обязательное поле',
            v => (v && v.length <= 256) || 'Название слишком длинное',
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
        formData.append("category", JSON.stringify(app.category))
        app.$store.dispatch('category/newCategory', formData)  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('category/loadingDeactivate')
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