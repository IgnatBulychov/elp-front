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
            :label="$t('title')"
          ></v-text-field>

          <v-textarea
            v-model="work.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.work.loading"
          >
            <template v-slot:label>
              <div>
                {{ $t('description') }}
              </div>
            </template>
          </v-textarea>


          <span color="secondary" class="body-1 my-2">{{ $t('images') }}</span>         
          <br>
          
          <v-btn  @click.stop="dialog = true" outlined class="my-2" color="teal" :disabled="$store.state.work.loading"> 
            <v-icon class="mr-3">mdi-image-plus</v-icon> {{ $t('add') }}
          </v-btn>

          <v-dialog v-model="dialog" scrollable max-width="90%">
            <selectFiles @imagesSelected="setImages" @cancel="dialog = false" :imgDefault="files"/> 
          </v-dialog>

          <br>

          <v-row>
            <v-col v-for="(file, key) in files" :key="file.id" 
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-card>
                <v-img :src='file.src'></v-img>
               <v-card-actions>
                  <v-spacer></v-spacer>             
                    <v-btn  @click="removeImage(key)" 
                      class="mx-2"
                      fab
                      small
                      icon
                      color="error"
                      :disabled="$store.state.work.loading"
                    >
                      <v-icon dark>mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-btn
            @click="$router.push(localePath('/dashboard/works'))"  
            class="my-2 mr-1"
            color="secondary"
            :disabled="$store.state.work.loading"
          >{{ $t('cancel') }}</v-btn>

          <v-btn
            type="submit"
            color="teal"
            class="my-2 mx-1"
            :disabled="$store.state.work.loading"
          >{{ $t('add') }}</v-btn>

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
          dialog: false,
          titleRules: [
            v => !!v || this.$t('title-req'),
            v => (v && v.length <= 256) || this.$t('title-max'),
          ],
          descriptionRules: [
            v => !!v || this.$t('desc-req'),
            v => (v && v.length <= 2048) || this.$t('desc-max'),
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
        let files = []
        this.files.forEach(function(item, i, arr) {
          files.push(item.id)
        })
        this.work.files = this.files  
        formData.append("work", JSON.stringify(this.work))
        app.$store.dispatch('work/newWork', formData)  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('work/loadingDeactivate')
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