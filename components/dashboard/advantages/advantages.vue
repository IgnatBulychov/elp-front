<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn
          :to="localePath('/dashboard/advantages/new')"
          fab
          small
          icon 
          color="teal"
        ><v-icon dark>mdi-plus</v-icon>
        </v-btn>    

        <template v-if="!advantages.length" > 
          <template v-if="$store.state.advantage.loading"> 
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
                  <th class="text-center">{{ $t('text') }}</th>
                  <th class="text-center">{{ $t('icon') }}</th>
                  <th class="text-center">{{ $t('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(advantage, index) in advantages" :key="advantage.id">
                  <td>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    >
                    {{ advantage.description }}
                  </span>
                   <td>
                    <v-icon v-if="advantage.icon">
                    mdi-{{ advantage.icon }}
                    </v-icon>
                    <v-icon v-else>
                    
                    </v-icon>
                  </td>
                  <td class="text-center">
                      <v-btn  
                        @click="remove(advantage.id, index)" 
                        :disabled="loadings[index] && $store.state.advantage.loading"
                        fab
                        small
                        icon
                        color="error"
                        :loading="loadings[index] && $store.state.advantage.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>

                      <v-btn 
                        :to="localePath('/dashboard/advantages/' + advantage.id)"
                        :disabled="loadings[index] && $store.state.advantage.loading"
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
    name: 'advantages',
    components: {
      serverSideErrors
    },
    data() {
        return {
            currentRemoving: -1  
        };
    },
    mounted() {
      this.$store.dispatch('advantage/getAdvantages')
    },
    computed: {
        advantages() {
          return this.$store.state.advantage.advantages
        },
        loadings() {
          let loadings = {}
          for (let i = 0; i < this.advantages.length; i++) { 
            if (this.currentRemoving == i) {
              loadings[i] = true
            } else {
              loadings[i] = false
            }   
          }
          return loadings
        },
        errorsFromServer: function () {
          return this.$store.state.advantage.errors
        }
    },
    methods: {
        remove(id, index) {
            this.currentRemoving = index
            this.$store.dispatch('advantage/removeAdvantage', id)
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>