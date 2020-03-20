<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>

    <v-form
      @submit.prevent="update"
    >

       <v-select
          v-model="selectedCategories"
          :items="categories"
          no-data-text="Категории не найдены"
          label="Категории"
          multiple
          chips
          persistent-hint
        ></v-select>

      <v-text-field
        v-model="item.title"
        @change="validateTitle()"
        :messages="errors.title.message"
        :error="errors.title.status"
        :persistent-hint="errors.title.status"
        :disabled="$store.getters.isLoading"
        label="Название записи"
      ></v-text-field>

      <v-textarea
        v-model="item.description"
        @change="validateDescription()"
        :messages="errors.description.message"
        :error="errors.description.status"
        :persistent-hint="errors.description.status"
        :disabled="$store.getters.isLoading"
      >
        <template v-slot:label>
          <div>
            Описание записи
          </div>
        </template>
      </v-textarea>

      <v-text-field
        v-model="item.cost"
        @change="validateCost()"
        :messages="errors.cost.message"
        :error="errors.cost.status"
        :persistent-hint="errors.cost.status"
        :disabled="$store.getters.isLoading"
        label="Цена"
      ></v-text-field>


      <v-btn
        @click="$router.push('/dashboard/items')"  
        color="secondary"
        :disabled="$store.getters.isLoading"
        class="mr-4"
      >Отмена</v-btn>

      <v-btn
        type="submit"
        color="teal"
        class="mr-4"
        :disabled="$store.getters.isLoading"
      >Изменить</v-btn>

    </v-form>
  </v-card-text>
  </v-card>
   
  </div>
</template>

<script>
export default {
  name: 'updateItem',
  data() {
      return {
          item: {
              title: '',
              description: '',
              cost: '',
              categories: [],
          },
          categoriesSetter: null,
          errors: {
            title: {
              status: false,
              message: ''
            },
            description:  {
              status: false,
              message: ''
            },
            cost:  {
              status: false,
              message: ''
            }
          },
      }
  },
  mounted() {
    this.$store.dispatch('category/getCategories')
  },
  computed: {
    categories() {
      let categories = []
      this.$store.state.category.categories.forEach(function(item, i, arr) {
        let category = {  
          text: item.title,
          value: item.id
        }
        categories.push(category)
      })
      return categories
    },
    selectedCategories: {
      get: function () {
        console.log(this.item)
        let categories = []
        if (this.categoriesSetter) {
          categories = this.categoriesSetter
          return categories
        } else {
          this.item.categories.forEach(function(item, i, arr) {
            let category = {  
              text: item.title,
              value: item.id
            }
            categories.push(category)
          })
          return categories
        }
       
      },
      set: function (newValue) {
        console.log(newValue)
        this.categoriesSetter = newValue
      } 
    },
    errorsFromServer: function () {
          return this.$store.state.category.errors
    }
  },
  created() {           
    if (this.$store.state.item.items.length) {
        this.item = this.$store.getters['item/getItem'](this.$route.params.id)
    } else {
        this.$store.commit('item/loadingActivate')
        this.$axios.$get(`/api/items/${this.$route.params.id}`)
            .then((response) => {
                this.item = response.item
                this.$store.commit('item/loadingDeactivate')
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
  methods: {
     update() {
      let app = this      
      if (this.validate()) {            
        const formData = new FormData();
        formData.append("item", JSON.stringify(this.item))
        formData.append("categories", JSON.stringify(this.selectedCategories))
        app.$store.dispatch('item/updateItem', [formData, app.$route.params.id])  
      } else {
        this.$store.commit('item/loadingDeactivate')
      }
    },
      validate () {
        this.validateTitle()
        this.validateDescription()
        this.validateCost()
        
        if (!((this.errors.title.status) || (this.errors.description.status) || (this.errors.cost.status))) {
          return true
        } else {
          return false
        }
      },
      validateTitleReset() {
        this.errors.title.status = false
        this.errors.title.message = ''
      },
      validateDescriptionReset() {
        this.errors.description.status = false
        this.errors.description.message = ''
      },
      validateCostReset() {
        this.errors.cost.status = false
        this.errors.cost.message = ''
      },
      validateTitle () {
        if (!this.item.title.length) {
          this.errors.title.status = true
          this.errors.title.message = 'Название - обязательное поле'
        } else if (this.item.title.length > 256) {
          this.errors.title.status = true
          this.errors.title.message = 'Название слишком длинное'
        } else { 
          this.validateTitleReset() 
        }
      },
      validateDescription() {
        if (!this.item.description.length) {
          this.errors.description.status = true
          this.errors.description.message = 'Описание - обязательное поле'
        } else if (this.item.description.length > 2048) {
          this.errors.description.status = true
          this.errors.description.message = 'Описание слишком длинное'
        } else { 
          this.validateDescriptionReset() 
        }
      },
      validateCost () {
        if (!this.item.cost.length) {
          this.errors.cost.status = true
          this.errors.cost.message = 'Цена - обязательное поле. Введите любое значение. Вы можете отключить ее отображение на сайте'
        } else if (this.item.cost.length > 25) {
          this.errors.cost.status = true
          this.errors.cost.message = 'Цена слишком большая, наверное...'
        } else { 
          this.validateCostReset() 
        }
      },
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>