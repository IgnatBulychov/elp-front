<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
        >
          <v-text-field
            v-model="category.title"
            @change="validateTitle()"
            :messages="errors.title.message"
            :error="errors.title.status"
            :persistent-hint="errors.title.status"
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
        v-model="serverErrors.status"
        :timeout="4000"
        :top="true"
        color="error"
      >
      <ul>
        <li v-for="error in serverErrors.messages" :key="error.id">
          {{ error }}
        </li>
      </ul>
      
      <v-btn
        color="white"
        text
        @click="serverErrors.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'newCategory',
  data() {
      return {
          category: {
              title: ''
          },
          serverErrors: {
              status: false,
              messages: []
          }, 
          errors: {
            title: {
              status: false,
              message: ''
            }
          },
      }
  },
  created() {           
    if (this.$store.state.category.categories.length) {
        this.category = this.$store.getters['category/getCategory'](this.$route.params.id)
    } else {
        this.$store.commit('category/loadingActivate')
        this.$axios.$get(`/api/categories/${this.$route.params.id}`)
            .then((response) => {
                console.log(response.category)
                this.category = response.category
                this.$store.commit('category/loadingDeactivate')
            });
    }
  },
  watch: {
      errorsFromServer: function (newValue) {
        if (newValue.response) {
          if (newValue.response.status === 401) {
            this.serverErrors.messages.push('Ошибка авторизации')
            this.$store.dispatch('auth/logout')  
          } else if (newValue.response.status === 400) {
            this.serverErrors.messages = JSON.parse(newValue.response.data.errors)
          } else {
            this.serverErrors.messages.push(newValue)
          }
        } else {
          this.serverErrors.messages.push(newValue)
        }
        this.serverErrors.status = true
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
      this.$store.commit('category/loadingActivate')   
      if (this.validate()) {            
        const formData = new FormData();
        formData.append("category", JSON.stringify(app.category))
        app.$store.dispatch('category/updateCategory', [formData, app.$route.params.id])  
      } else {
        this.$store.commit('category/loadingDeactivate')
      }
    },
    validate () {
        this.validateTitle()
        
        if (!(this.errors.title.status )) {
          return true
        } else {
          return false
        }
      },
      validateTitleReset() {
        this.errors.title.status = false
        this.errors.title.message = ''
      },
      validateTitle () {
        if (!this.category.title.length) {
          this.errors.title.status = true
          this.errors.title.message = 'Название - обязательное поле'
        } else if (this.category.title.length > 256) {
          this.errors.title.status = true
          this.errors.title.message = 'Название слишком длинное'
        } else { 
          this.validateTitleReset() 
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