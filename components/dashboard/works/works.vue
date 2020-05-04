<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn
          :to="localePath('/dashboard/works/new')"
          fab
          small
          icon 
          color="teal"
        ><v-icon dark>mdi-plus</v-icon>
        </v-btn>    
        <template v-if="!works.length" > 
          <template v-if="$store.state.work.loading"> 
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
                {{ $t('no-records') }}
              </v-col>
            </v-row>
          </template>      
        </template>
        <template v-else> 
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">{{ $t('title') }}</th>
                  <th class="text-center">{{ $t('description') }}</th>
                  <th class="text-center">{{ $t('images') }}</th>
                  <th class="text-center">{{ $t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
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
                      v-if="work.files.length"
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                      {{ work.files.length }}
                    </span>
                    <span v-else>
                      {{ $t('no-files') }}
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
                        :to="localePath('/dashboard/works/' + work.id)"
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