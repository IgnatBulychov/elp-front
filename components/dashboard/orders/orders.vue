<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <template v-if="!orders.length" > 
          <template v-if="$store.state.order.loading"> 
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
                  <th class="text-center">{{ $t('name') }}</th>
                  <th class="text-center">{{ $t('contacts') }}</th>
                  <th class="text-center">{{ $t('order') }}</th>
                  <th class="text-center">{{ $t('date') }}</th>
                  <th class="text-center">{{ $t('remove') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                  <td>
                      {{ order.name }}
                  </td>
                  <td>
                      {{ $t('phone') }}: {{ order.phone }} <br>
                      {{ $t('email') }}: {{ order.email }} <br>
                  </td>
                  <td>
                      {{ order.description }}
                  </td>
                  <td>
                      {{ order.created_at }}
                  </td>
                  <td class="text-center">
                      <v-btn  
                        @click="remove(order.id, index)" 
                        :disabled="loadings[index] && $store.state.order.loading"
                        fab
                        small
                        icon
                        color="error"
                        :loading="loadings[index] && $store.state.order.loading"
                      >
                        <v-icon dark>mdi-delete-outline</v-icon>
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
    name: 'orders',
    components: {
      serverSideErrors
    },
    data() {
        return {
            currentRemoving: -1  
        };
    },
    mounted() {
      this.$store.dispatch('order/getOrders')
    },
    computed: {
        orders() {
          return this.$store.state.order.orders
        },
        loadings() {
          let loadings = {}
          for (let i = 0; i < this.orders.length; i++) { 
            if (this.currentRemoving == i) {
              loadings[i] = true
            } else {
              loadings[i] = false
            }   
          }
          return loadings
        },
        errorsFromServer: function () {
          return this.$store.state.order.errors
        }
    },
    methods: {
        remove(id, index) {
            this.currentRemoving = index
            this.$store.dispatch('order/removeOrder', id)
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>