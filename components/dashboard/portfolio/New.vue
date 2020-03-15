<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        
        <v-progress-linear
          v-if="$store.getters.isLoading"
          indeterminate
          color="teal"
        ></v-progress-linear> 


        <v-form
          @submit.prevent="add"
        >

          <v-text-field
            v-model="portfolioItem.title"
            @change="validateTitle()"
            :messages="errors.title.message"
            :error="errors.title.status"
            :persistent-hint="errors.title.status"
            :disabled="$store.getters.isLoading"
            label="Название записи"
          ></v-text-field>

          <v-textarea
            v-model="portfolioItem.description"
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


          <v-file-input
            v-model="imgs"
            @change="validateImgs()"
            :messages="errors.imgs.message"
            :error="errors.imgs.status"
            :persistent-hint="errors.imgs.status"
            :disabled="$store.getters.isLoading"
            accept="image/png, image/jpeg, image/bmp"
            show-size
            label="Изображения"
            prepend-icon="photo_camera"
            multiple
            chips
          ></v-file-input>

          <v-btn
            @click="$router.push('/dashboard/portfolio')"
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
  name: 'new',
  data() {
      return {
          portfolioItem: {
              title: '',
              description: '',
          },
          imgs: [],
          errors: {
            title: {
              status: false,
              message: ''
            },
            description:  {
              status: false,
              message: ''
            },
            imgs: {
              status: false,
              message: ''
            },
          },
      }
  },
  computed: {
      currentUser() {
        return this.$store.getters.currentUser
      },
  },
  methods: {
      add() {
        let app = this      
        
        if (this.validate()) {            

          app.$store.state.loading= true

          const formData = new FormData();

          app.imgs.forEach(function(item, i, arr) {
            formData.append(`imgs[${i}]`, item)
          });

          formData.append("portfolioItem", JSON.stringify(app.portfolioItem))

          axios.post('/api/portfolioitems/new', formData)
          .then(response => {
                app.$store.state.loading = false
                app.$router.push('/dashboard/portfolio')
          })
        } else {
          app.app.$store.getters.isLoading = false
        }
      },
      validate () {
        this.validateTitle()
        this.validateDescription()
        this.validateImgs()
        if (!((this.errors.title.status) || (this.errors.description.status) || (this.errors.imgs.status))) {
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
      validateImgsReset() {
        this.errors.imgs.status = false
        this.errors.imgs.message = ''
      },

      validateTitle () {
        if (!this.portfolioItem.title.length) {
          this.errors.title.status = true
          this.errors.title.message = 'Название - обязательное поле'
        } else if (this.portfolioItem.title.length > 256) {
          this.errors.title.status = true
          this.errors.title.message = 'Название слишком длинное'
        } else { 
          this.validateTitleReset() 
        }
      },
      validateDescription() {
        if (!this.portfolioItem.description.length) {
          this.errors.description.status = true
          this.errors.description.message = 'Описание - обязательное поле'
        } else if (this.portfolioItem.description.length > 2048) {
          this.errors.description.status = true
          this.errors.description.message = 'Описание слишком длинное'
        } else { 
          this.validateDescriptionReset() 
        }
      },
      validateImgs() {

        let max = 0
        let formats = []
        let errorsOfFormat = 0
        
        if (this.imgs.length > 0) {
            this.imgs.forEach(function(item, i, arr) {
              if (item.size > max) {
                max = item.size
              }
              formats.push(item.name.split(".").pop().toLowerCase())
            });
        }
        
        formats.forEach(function(item, i, arr) {
            if (item == 'jpeg') {
              return
            } else if (item == 'jpg') {
              return
            } else if (item == 'png') {
              return
            } else if (item == 'bmp') {
              return
            } else if (item == 'gif') {
              return
            } else if (item == 'svg') {
              return
            } else {
              errorsOfFormat += 1
            }
        })

        if (this.imgs.length == 0) {
          this.errors.imgs.status = true
          this.errors.imgs.message = 'Вы не добавили фото'
        } else if (this.imgs.length > 15) {
          this.errors.imgs.status = true
          this.errors.imgs.message = 'Количество фотографий должно быть менее 15'
        } else if (max > 3000000) {
          this.errors.imgs.status = true
          this.errors.imgs.message = 'Изображения должны быть не более 3 Мб'
        } else if (errorsOfFormat > 0) {
          this.errors.imgs.status = true
          this.errors.imgs.message = 'Изображения должны быть в формате JPEG, PNG, BMP, GIF или SVG'
        } else { 
          this.validateImgsReset() 
        }
      },
      onChangeImg() {
        this.validateImgs()
      }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>