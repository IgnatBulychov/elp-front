<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>

    <v-form
      @submit.prevent="add"
    >

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
        @click="$router.push('/dashboard/pricecategories')"  
        color="secondary"
        :disabled="$store.getters.isLoading"
        class="mr-4"
      >Отмена</v-btn>

      <v-btn
        type="submit"
        color="teal"
        class="mr-4"
        :disabled="$store.getters.isLoading"
      >Добавить</v-btn>

    </v-form>
  </v-card-text>
  </v-card>
   
  </div>
</template>

<script>
export default {
  name: 'newItem',
  data() {
      return {
          item: {
              title: '',
              description: '',
              cost: ''
          },
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
  computed: {
      currentUser() {
        return this.$store.getters.currentUser
        console.log('helo uset')
      },
      priceCategoryId() {
        return this.$route.params.id
      }
  },
  methods: {
      add() {
        let app = this      
        
        if (this.validate()) {            

          app.$store.state.item.loading= true

          const formData = new FormData();

          formData.append("item", JSON.stringify(app.item))
          formData.append("priceCategoryId", app.priceCategoryId)
          
          app.$axios.$post('/api/items/new', formData)
          .then(response => {
                app.$store.state.loading = false
                this.$store.dispatch('getPrice')
                app.$router.push('/dashboard/items')
          })
        } else {
          app.$store.getters.isLoading = false
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
      }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>