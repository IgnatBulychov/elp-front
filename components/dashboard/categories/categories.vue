<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn :to="`/dashboard/categories/new`" class="ma-2" dark color="teal">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>    

        <v-simple-table>
          <template v-slot:default>
            <thead>
                <tr>
                <th class="text-center">Название</th>
                <th class="text-center">Действия</th>
                </tr>
            </thead>
            <tbody>
              <template v-if="!categories.length" > 
                <template v-if="$store.state.category.loading"> 
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
                        Пока категорий нет
                        </div>
                    </td>
                  </tr>
                </template>      
              </template>
              <template v-else>
                  
                <tr v-for="(category, index) in categories" :key="category.id">
                    <td>{{ category.title }}</td>
                    <td class="text-center">
                        <v-btn  @click="remove(category.id, index)" 
                          class="mx-2"
                          fab
                          small
                          color="error"
                          :loading="loadings[index] && $store.state.category.loading"
                        >
                          <v-icon dark>mdi-delete-outline</v-icon>
                        </v-btn>

                        <v-btn 
                          :to="`/dashboard/categories/${category.id}`"
                          class="mx-2" 
                          fab 
                          dark 
                          small 
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
       <v-snackbar
        v-model="serverErrors.status"
        :timeout="4000"
        :top="true"
        color="error"
      >{{ serverErrors.messages }}
      <v-btn
        color="white"
        text
        @click="serverErrors.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'categories',
        data() {
            return {
                currentRemoving: -1,
                serverErrors: {
                  status: false,
                  messages: []
                },  
            };
        },
        mounted() {
          this.$store.dispatch('category/getCategories')
        },
        watch: {
          errorsFromServer: function (newValue) {
            this.serverErrors.messages = newValue
            this.serverErrors.status = true
          }
        },
        computed: {
            categories() {
              return this.$store.state.category.categories
            },
            loadings() {
              let loadings = {}
              for (let i = 0; i < this.categories.length; i++) { 
                if (this.currentRemoving == i) {
                  loadings[i] = true
                } else {
                  loadings[i] = false
                }   
              }
              return loadings
            },
            errorsFromServer: function () {
                return this.$store.state.category.errors
            }
        },
        methods: {
            remove(id, index) {
                this.currentRemoving = index
                this.$store.dispatch('category/removeCategory', id)
            }
        }
    }
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
/*
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
  }*/
</style>