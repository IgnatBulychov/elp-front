<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="add"
          ref="form"
        >
          <v-text-field
            v-model="work.title"
            :rules="titleRules"
            required
            :disabled="$store.state.work.loading"
            label="Название записи"
          ></v-text-field>

          <v-textarea
            v-model="work.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.work.loading"
          >
            <template v-slot:label>
              <div>
                Описание записи
              </div>
            </template>
          </v-textarea>


          <span color="secondary" class="body-1 my-2">Файлы:</span>         
          <br>
          
          <selectFiles @imagesSelected="setImages"/> 

          <br>

          <v-row>
            <v-col v-for="(file, key) in files" :key="file.id" cols="2">
              <v-card>
                <v-img :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'></v-img>
               <v-card-actions>
                    <v-spacer></v-spacer>             
                      <v-btn  @click="removeImage(key)" 
                        class="mx-2"
                        fab
                        small
                        icon
                        color="error"
                        
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-btn
            @click="$router.push('/dashboard/works')"  
            class="my-2 mx-1"
            color="secondary"
            :disabled="$store.state.work.loading"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            class="my-2 mx-1"
            :disabled="$store.state.work.loading"
          >Добавить</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/> 
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
import selectFiles from '~/components/dashboard/files/selectFiles.vue'

export default {
  name: 'newWork',
  components: {
    serverSideErrors, selectFiles
  },
  data() {
      return {
          work: {
              title: '',
              description: '',
          },
          files: [],
          titleRules: [
            v => !!v || 'Название - обязательное поле',
            v => (v && v.length <= 256) || 'Название слишком длинное',
          ],
          descriptionRules: [
            v => !!v || 'Описание - обязательное поле',
            v => (v && v.length <= 2048) || 'Описание слишком длинное',
          ]
      }
  },
  computed: {
    errorsFromServer: function () {
          return this.$store.state.work.errors
    }
  },
  methods: {
     add() {
      let app = this      
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("work", JSON.stringify(this.work))
        app.$store.dispatch('work/newWork', formData)  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('work/loadingDeactivate')
      }
    },
    setImages(imgs) {
      this.files = imgs
    },
    removeImage(id) {
      console.log(this.files)
      this.files = this.files.splice(id, 1)
    }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>