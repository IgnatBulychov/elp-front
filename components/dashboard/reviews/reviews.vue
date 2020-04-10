<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn
          :to="`/dashboard/reviews/new`" 
          fab
          small
          icon 
          color="teal"
        ><v-icon dark>mdi-plus</v-icon>
        </v-btn>    
        <template v-if="!reviews.length" > 
          <template v-if="$store.state.review.loading"> 
              <v-row  v-for="n in 3" :key="n" >
                <v-col>
                  <v-skeleton-loader
                    class="mx-auto"
                    type="list-item-two-line"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
          </template>
          <template v-else>
            <v-row>
              <v-col class="text-center">
                Пока отзывов нет
              </v-col>
            </v-row>
          </template>      
        </template>
        <template v-else> 
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Имя</th>
                  <th class="text-center">Отзыв</th>
                  <th class="text-center">Фото</th>
                  <th class="text-center">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(review, index) in reviews" :key="review.id">
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ review.name }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ review.review }}
                    </span>
                  </td>
                  <td>
                    <div
                      v-if="review.files.length"
                    >
                    <v-avatar  
                      size="30"
                      class="mx-1"
                      v-for="file in review.files"
                      :key="file.id"
                    >
                      <v-img 
                        :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'
                      >
                      </v-img>
                    </v-avatar>
                    </div>
                    <span v-else  class="d-inline-block text-truncate"
                      style="max-width: 120px;">
                      Фото нет
                    </span>
                  </td>
                  <td class="text-center">
                      <v-btn  
                        @click="remove(review.id, index)" 
                        :disabled="loadings[index] && $store.state.review.loading"
                        fab
                        small
                        icon
                        color="error"
                        :loading="loadings[index] && $store.state.review.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>

                      <v-btn 
                        :to="`/dashboard/reviews/${review.id}`"
                        :disabled="loadings[index] && $store.state.review.loading"
                        fab
                        small
                        icon
                        color="warning"
                      >
                        <v-icon dark>mdi-lead-pencil</v-icon>
                      </v-btn>                                    
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>  
      </v-card-text>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'reviews',
    components: {
      serverSideErrors
    },
    data() {
        return {
            currentRemoving: -1  
        };
    },
    mounted() {
      this.$store.dispatch('review/getReviews')
    },
    computed: {
        reviews() {
          return this.$store.state.review.reviews
        },
        loadings() {
          let loadings = {}
          for (let i = 0; i < this.reviews.length; i++) { 
            if (this.currentRemoving == i) {
              loadings[i] = true
            } else {
              loadings[i] = false
            }   
          }
          return loadings
        },
        errorsFromServer: function () {
          return this.$store.state.review.errors
        }
    },
    methods: {
        remove(id, index) {
            this.currentRemoving = index
            this.$store.dispatch('review/removeReview', id)
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>