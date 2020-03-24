<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
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
            class="mr-4"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            class="mr-4"
            :disabled="$store.state.category.loading"
          >Изменить</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
     <v-snackbar
        v-model="errorsFromServer.status"
        :timeout="5000"
        :top="true"
        color="error"
      >
      <ul>
        <li v-for="error in errorsFromServer.messages" :key="error.id">
          {{ error }}
        </li>
      </ul>
      
      <v-btn
        color="white"
        text
        @click="errorsFromServer.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'updateCategory',
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
  created() {           
    if (this.$store.state.category.categories.length) {
        this.category = this.$store.getters['category/getCategory'](this.$route.params.id)
    } else {
        this.$store.commit('category/loadingActivate')
        this.$axios.$get(`/api/categories/${this.$route.params.id}`)
            .then((response) => {
                this.category = response.category
                this.$store.commit('category/loadingDeactivate')
            });
    }
  },
  computed: {
      errorsFromServer: function () {
          return this.$store.state.category.errors
      }
  },
  methods: {
    update() {
      let app = this     
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("category", JSON.stringify(app.category))
        app.$store.dispatch('category/updateCategory', [formData, app.$route.params.id])  
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