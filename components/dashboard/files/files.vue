<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-card
          flat
        >
          <v-form
            @submit.prevent="newFile"
          >
            <v-card-text>
              <v-row
                align="center"
                justify="center"
              >
                <v-col cols="8">
                  <v-file-input
                    v-model="newFiles"
                    @change="validateImages()"
                    :messages="errors.message"
                    :error="errors.status"
                    :persistent-hint="errors.status"
                    :disabled="$store.state.file.loading"
                    accept="image/png, image/jpeg, image/bmp"
                    show-size
                    color="teal"
                    label="Изображения"
                    prepend-icon="mdi-camera"
                    multiple
                    chips
                    class="mx-2"
                  ></v-file-input>
                </v-col>  
                <v-col cols="4" class="text-right">
                  <v-btn
                    class="mx-2"
                    :disabled="$store.state.file.loading"
                    type="submit"
                    color="teal"
                  >Добавить</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
        <template v-if="!files.length" > 
          <template v-if="$store.state.file.loading"> 
            <v-row>
              <v-col v-for="n in 3" :key="n"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <div  class="text-center my-2">
              Пока файлов нет
            </div>
          </template>      
        </template>
        <template v-else>  
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="(file, index) in files" :key="file.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card>
                  <v-img
                    :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'
                    class="white--text align-end"
                    height="160px"
                  ></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>             
                      <v-btn  @click="remove(file.id, index)" 
                        class="mx-2"
                        fab
                        small
                        icon
                        color="error"
                        :disabled="loadings[index] && $store.state.file.loading"
                        :loading="loadings[index] && $store.state.file.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>       
      </v-card-text>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
  name: 'files',
  components: {
    serverSideErrors
  },
  data() {
      return {
        newFiles: [],
        errors: {          
          status: false,
          message: ''
        },
        currentRemoving: -1
      }
  },
  mounted() {
    this.$store.dispatch('file/getFiles')
  },
  computed: {
      files() {
        return this.$store.state.file.files
      },
      loadings() {
        let loadings = {}
        for (let i = 0; i < this.files.length; i++) { 
          if (this.currentRemoving == i) {
            loadings[i] = true
          } else {
            loadings[i] = false
          }   
        }
        return loadings
      },
      errorsFromServer: function () {
          return this.$store.state.file.errors
      }
  },
  methods: {
    newFile() {
        let app = this     
      
        if (this.validate()) {            
          const formData = new FormData();
          
          app.newFiles.forEach(function(item, i, arr) {
          formData.append(`files[${i}]`, item)
          
        });
          app.$store.dispatch('file/newFile', formData)  
          app.newFiles = []
        } else {
          this.$store.commit('file/loadingDeactivate')
        }
    },
    validate () {
      this.validateImages()
      
      if (!(this.errors.status)) {
        return true
      } else {
        return false
      }
    },
    validateImages() {
      let max = 0
      let formats = []
      let errorsOfFormat = 0

      if (this.newFiles.length > 0) {
          this.newFiles.forEach(function(item, i, arr) {
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

      if (this.newFiles.length == 0) {
        this.errors.status = true
        this.errors.message = 'Вы не добавили фото'
      } else if (this.newFiles.length > 15) {
        this.errors.status = true
        this.errors.message = 'Количество фотографий должно быть менее 15'
      } else if (max > 3000000) {
        this.errors.status = true
        this.errors.message = 'Изображения должны быть не более 3 Мб'
      } else if (errorsOfFormat > 0) {
        this.errors.status = true
        this.errors.message = 'Изображения должны быть в формате JPEG, PNG, BMP, GIF или SVG'
      } else { 
        this.validateImagesReset() 
      }
  },
  validateImagesReset() {
    this.errors.status = false
    this.errors.message = ''
  },
  remove(id, index) {
      this.currentRemoving = index
      this.$store.dispatch('file/removeFile', id)
  }
 }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>