<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn 
          :to="`/dashboard/items/new`"
          class="ma-2" 
          fab           
          small
          icon dark color="teal"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>    

        <v-simple-table>
          <template v-slot:default>
            <thead>
                <tr>
                <th class="text-center">Название</th>
                <th class="text-center">Описание</th>
                <th class="text-center">Цена</th>
                <th class="text-center">Категории</th>
                <th class="text-center">Действия</th>
                </tr>
            </thead>
            <tbody>
              <template v-if="!items.length" > 
                <template v-if="$store.state.item.loading"> 
                  <tr>
                    <td colspan="5" class="text-center">
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
                    <td colspan="5" class="text-center">
                        <div  class="text-center">
                        Пока записей нет
                        </div>
                    </td>
                  </tr>
                </template>      
              </template>
              <template v-else>
                  
                <tr v-for="(item, index) in items" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.cost }}</td>
                    <td>
                      <v-chip
                        v-for="category in item.categories" :key="category.id"
                        class="ma-2"
                        color="teal"
                        text-color="white"
                      >
                         {{ category.title }}
                      </v-chip>
                     
                    </td>
                    <td class="text-center">
                        <v-btn  @click="remove(item.id, index)" 
                          class="mx-2"
                          fab
                          small
                          icon
                          color="error"
                          :loading="loadings[index] && $store.state.item.loading"
                        >
                          <v-icon dark>mdi-delete-outline</v-icon>
                        </v-btn>

                        <v-btn 
                          :to="`/dashboard/items/${item.id}`"
                          class="mx-2" 
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
        name: 'items',
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
          this.$store.dispatch('item/getItems')
        },
        watch: {
          errorsFromServer: function (newValue) {
            this.serverErrors.messages = newValue
            this.serverErrors.status = true
          }
        },
        computed: {
            items() {
              return this.$store.state.item.items
            },
            loadings() {
              let loadings = {}
              for (let i = 0; i < this.items.length; i++) { 
                if (this.currentRemoving == i) {
                  loadings[i] = true
                } else {
                  loadings[i] = false
                }   
              }
              return loadings
            },
            errorsFromServer: function () {
                return this.$store.state.item.errors
            }
        },
        methods: {
            remove(id, index) {
                this.currentRemoving = index
                this.$store.dispatch('item/removeItem', id)
            }
        }
    }
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>