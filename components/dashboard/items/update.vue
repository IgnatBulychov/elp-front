<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
          ref="form"
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
            :rules="titleRules"
            required
            :disabled="$store.state.item.loading"
            label="Название записи"
          ></v-text-field>

          <v-textarea
            v-model="item.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.item.loading"
          >
            <template v-slot:label>
              <div>
                Описание записи
              </div>
            </template>
          </v-textarea>

          <v-text-field
            v-model="item.cost"
            :rules="costRules"
            required
            :disabled="$store.state.item.loading"
            label="Цена"
          ></v-text-field>

          <v-btn
            @click="$router.push('/dashboard/items')"  
            color="secondary"
            :disabled="$store.state.item.loading"
            class="mr-4"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            class="mr-4"
            :disabled="$store.state.item.loading"
          >Изменить</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
  name: 'updateItem',
  components: {
    serverSideErrors
  },
  data() {
      return {
          item: {
              title: '',
              description: '',
              cost: '',
              categories: [],
          },
          selectedCategories: [],
          titleRules: [
            v => !!v || 'Название - обязательное поле',
            v => (v && v.length <= 256) || 'Название слишком длинное',
          ],
          descriptionRules: [
            v => !!v || 'Описание - обязательное поле',
            v => (v && v.length <= 2048) || 'Описание слишком длинное',
          ],
          costRules: [
            v => !!v || 'Цена - обязательное поле',
            v => (v && v.length <= 25) || 'Кажеться цена слишком большая',
          ]
      }
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
    errorsFromServer: function () {
          return this.$store.state.item.errors
    }
  },
  created() { 
    this.$store.dispatch('category/getCategories')          
    
    if (this.$store.state.item.items.length) {
        this.item = this.$store.getters['item/getItem'](this.$route.params.id)
        this.initSelectedCategories()
    } else {
        this.$store.commit('item/loadingActivate')
        this.$axios.$get(`/api/items/${this.$route.params.id}`)
        .then((response) => {
            this.item = response.item
            this.initSelectedCategories()
            this.$store.commit('item/loadingDeactivate')
        });
    }
  },
  methods: {
     update() {
      let app = this      
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("item", JSON.stringify(this.item))
        formData.append("categories", JSON.stringify(this.selectedCategories))
        app.$store.dispatch('item/updateItem', [formData, app.$route.params.id])  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('item/loadingDeactivate')
      }
    },
    initSelectedCategories() {
      let categories = []
      this.item.categories.forEach(function(item, i, arr) {
        categories.push(item.id)
      })
      this.selectedCategories = categories
    }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>