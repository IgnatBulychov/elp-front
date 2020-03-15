<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="add"
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
          >Добавить</v-btn>

        </v-form>
      </v-card-text>
    </v-card>  
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
          errors: {
            title: {
              status: false,
              message: ''
            }
          },
      }
  },
  methods: {
    add() {
      let app = this      
      if (this.validate()) {            
        const formData = new FormData();
        formData.append("category", JSON.stringify(app.category))
        app.$store.dispatch('category/newCategory', formData)  
      } else {
        app.$store.state.category.loading = false
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