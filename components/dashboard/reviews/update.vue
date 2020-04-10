<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
          ref="form"
        >
          <v-text-field
            v-model="review.name"
            :rules="nameRules"
            required
            :disabled="$store.state.review.loading"
            label="Имя"
          ></v-text-field>

          <v-textarea
            v-model="review.review"
            :rules="reviewRules"
            required
            :disabled="$store.state.review.loading"
          >
            <template v-slot:label>
              <div>
                Отзыв
              </div>
            </template>
          </v-textarea>

          <span color="secondary" class="body-1 my-2">Фото:</span>         
          <br>
          
          <v-btn  @click.stop="dialog = true" outlined class="my-2" color="teal" :disabled="$store.state.review.loading"> 
            <v-icon class="mr-3">mdi-image-plus</v-icon> Добавить Файлы
          </v-btn>

          <v-dialog v-model="dialog" scrollable max-width="90%">
            <selectFiles @imagesSelected="setImages" @cancel="dialog = false" :imgDefault="files"/> 
          </v-dialog>

          <br>

          <v-row>
            <v-col v-for="(file, key) in files" :key="file.id" cols="2">
              <v-card>
                <v-img :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'></v-img>
                <v-card-actions>
                  <v-spacer></v-spacer>             
                    <v-btn @click="removeImage(key)" 
                      class="mx-2"
                      fab
                      small
                      icon
                      color="error"
                      :disabled="$store.state.review.loading"
                    >
                      <v-icon dark>mdi-delete-outline</v-icon>
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-btn
            @click="$router.push('/dashboard/reviews')"  
            class="my-2 mx-1"
            color="secondary"
            :disabled="$store.state.review.loading"
          >Отмена</v-btn>

          <v-btn
            type="submit"
            color="teal"
            class="my-2 mx-1"
            :disabled="$store.state.review.loading"
          >Изменить</v-btn>

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
  name: 'updateReview',
  components: {
    serverSideErrors, selectFiles
  },
  data() {
      return {
          review: {
              name: '',
              review: '',
          },
          files: [],          
          dialog: false,
          nameRules: [
            v => !!v || 'Имя - обязательное поле',
            v => (v && v.length <= 128) || 'Имя слишком длинное',
          ],
          reviewRules: [
            v => !!v || 'Отзыв - обязательное поле',
            v => (v && v.length <= 2048) || 'Отзыв слишком длинный',
          ]
      }
  },
  computed: {
    errorsFromServer: function () {
      return this.$store.state.review.errors
    }
  },
  created() {        
    if (this.$store.state.review.reviews.length) {
        this.review = this.$store.getters['review/getReview'](this.$route.params.id)
        this.files = this.review.files
    } else {
        this.$store.commit('review/loadingActivate')
        this.$axios.$get(`/api/reviews/${this.$route.params.id}`)
        .then((response) => {
            this.review = response.review
            this.files = response.review.files
            this.$store.commit('review/loadingDeactivate')
        });
    }
  },
  methods: {
    update() {
      let app = this      
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        let files = []
        this.files.forEach(function(item, i, arr) {
          files.push(item.id)
        })
        this.review.files = this.files
        formData.append("review", JSON.stringify(this.review))
        
        app.$store.dispatch('review/updateReview', [formData, app.$route.params.id])  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('review/loadingDeactivate')
      }
    },
    setImages(imgs) {
      this.files = imgs
      this.dialog = false
    },
    removeImage(id) {
      this.files.splice(id,1)
    }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>