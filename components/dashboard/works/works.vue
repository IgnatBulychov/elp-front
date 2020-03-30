<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn
          :to="`/dashboard/works/new`" 
          fab
          small
          icon 
          color="teal"
        ><v-icon dark>mdi-plus</v-icon>
        </v-btn>    

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Название</th>
                <th class="text-center">Описание</th>
                <th class="text-center">Файлы</th>
                <th class="text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="!works.length" > 
                <template v-if="$store.state.work.loading"> 
                  <tr>
                    <td colspan="4">
                       <v-row  v-for="n in 3" :key="n" >
                        <v-col>
                          <v-skeleton-loader
                            class="mx-auto"
                            type="list-item-two-line"
                          ></v-skeleton-loader>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4" class="text-center">
                        <div  class="text-center">
                        Пока записей в портфолио нет
                        </div>
                    </td>
                  </tr>
                </template>      
              </template>
              <template v-else>                  
                <tr v-for="(work, index) in works" :key="work.id">
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ work.title }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ work.description }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ work.files }}
                    </span>
                  </td>
                  <td class="text-center">
                      <v-btn  
                        @click="remove(work.id, index)" 
                        :disabled="loadings[index] && $store.state.work.loading"
                        fab
                        small
                        icon
                        color="error"
                        :loading="loadings[index] && $store.state.work.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>

                      <v-btn 
                        :to="`/dashboard/works/${work.id}`"
                        :disabled="loadings[index] && $store.state.work.loading"
                        fab
                        small
                        icon
                        color="warning"
                      >
                        <v-icon dark>mdi-lead-pencil</v-icon>
                      </v-btn>                                    
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'works',
    components: {
      serverSideErrors
    },
    data() {
        return {
            currentRemoving: -1  
        };
    },
    mounted() {
      this.$store.dispatch('work/getWorks')
    },
    computed: {
        works() {
          return this.$store.state.work.works
        },
        loadings() {
          let loadings = {}
          for (let i = 0; i < this.works.length; i++) { 
            if (this.currentRemoving == i) {
              loadings[i] = true
            } else {
              loadings[i] = false
            }   
          }
          return loadings
        },
        errorsFromServer: function () {
          return this.$store.state.work.errors
        }
    },
    methods: {
        remove(id, index) {
            this.currentRemoving = index
            this.$store.dispatch('work/removeWork', id)
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>