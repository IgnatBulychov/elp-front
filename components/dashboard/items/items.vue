<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-btn 
          :to="`/dashboard/items/new`"
          fab           
          small
          icon 
          color="teal"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>    

        <template v-if="!items.length" > 
          <template v-if="$store.state.item.loading"> 
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
            <v-row  v-for="n in 3" :key="n">
              <v-col>
                Пока записей нет
              </v-col>
            </v-row>
          </template>      
        </template>
        <template v-else>
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
                <tr v-for="(item, index) in items" :key="item.id">
                  <td>
                    <span
                    class="d-inline-block text-truncate"
                    style="max-width: 50px;"
                    >
                      {{ item.title }}
                    </span>
                  </td>
                  <td>
                    <span
                    class="d-inline-block text-truncate"
                    style="max-width: 50px;"
                    >
                      {{ item.description }}
                    </span>
                  </td>
                  <td>
                    <span
                    class="d-inline-block text-truncate"
                    style="max-width: 50px;"
                    >
                      {{ item.cost }}
                    </span>
                  </td>
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
                        fab
                        small
                        icon
                        color="error"
                        :disabled="loadings[index] && $store.state.item.loading"
                        :loading="loadings[index] && $store.state.item.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>

                      <v-btn 
                        :to="`/dashboard/items/${item.id}`"
                        :disabled="loadings[index] && $store.state.item.loading"
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
    name: 'items',
    components: {
      serverSideErrors
    },
    data() {
        return {
            currentRemoving: -1  
        };
    },
    mounted() {
      this.$store.dispatch('item/getItems')
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