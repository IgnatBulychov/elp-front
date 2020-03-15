<template>
    <div> 
      <v-card :elevation="2">
        <v-card-text>
        
        <v-btn :to="`/dashboard/items/new`" class="ma-2" dark color="teal">
            <v-icon dark>mdi-plus</v-icon>         </v-btn>    

          <v-simple-table>
              <template v-slot:default>
                  
                  <thead>
                      <tr>
                      <th class="text-center">Название</th>
                      <th class="text-center">Описание</th>
                      <th class="text-center">Действия</th>
                      </tr>
                  </thead>
                  <tbody>
                          <template v-if="!portfolioItems.length" > 
                              <template v-if="$store.getters.isLoading"> 
                                  <tr>
                                      <td colspan="3" class="text-center">
                                          <div  class="text-center">
                                              <v-progress-circular
                                                  :size="30"
                                                  color="teal"
                                                  indeterminate
                                              ></v-progress-circular>
                                          </div>
                                      </td>
                                  </tr>
                              </template>
                              <template v-else>
                                      <tr>
                                  <td colspan="3" class="text-center">
                                      <div  class="text-center">
                                      В портфолио пока нет записей
                                      </div>
                                  </td>
                                  </tr>
                              </template>      
                          </template>
                          <template v-else>
                              <tr v-for="(portfolioItem, index) in portfolioItems" :key="portfolioItem.id">
                                  <td>{{ portfolioItem.title }}</td>
                                  <td>{{ portfolioItem.description }}</td>
                                  <td class="text-center">
                                      <v-btn  @click="remove(portfolioItem.id, index)" 
                                        class="mx-2"
                                        fab
                                        small
                                        color="error"
                                        :loading="loadings[index] && $store.getters.isLoading"
                                      >
                                        <v-icon dark>delete_outline</v-icon>
                                      </v-btn>

                                      <v-btn 
                                        :to="`/dashboard/portfolio/${portfolioItem.id}`"
                                        class="mx-2" 
                                        fab 
                                        dark 
                                        small 
                                        color="warning"
                                      >
                                        <v-icon dark>edit</v-icon>
                                      </v-btn>                                    
                                  </td>
                              </tr>
                          </template>
                      
                  </tbody>
              </template>
          </v-simple-table>
        
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
    export default {
        name: 'items',
        data() {
            return {
                currentRemoving: -1
            };
        },
        mounted() {
            //this.$store.dispatch('portfolio/getPortfolioItems')
        },
        computed: {
            portfolioItems() {
                //return this.$store.state.portfolio.portfolioItems
                return []
            },
            loadings() {
              let loadings = {}
              for (let i = 0; i < this.portfolioItems.length; i++) { 
                if (this.currentRemoving == i) {
                  loadings[i] = true
                } else {
                  loadings[i] = false
                }   
              }
              return loadings
            }
        },
        created() {
          this.$store.state.portfolio.loading = false
        },
        methods: {
            remove(id, index) {
                this.currentRemoving = index
                this.$store.dispatch('portfolio/removePortfolioItem', id)
            }
        }
    }
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>