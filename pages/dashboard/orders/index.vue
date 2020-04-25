<template>
  <orders/>
</template>

<script>
import orders from '~/components/dashboard/orders/orders.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    orders
  }
  
}
</script>
