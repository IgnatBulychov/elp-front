<template>
  <updateItem/>
</template>

<script>
import updateItem from '~/components/dashboard/items/update.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    updateItem
  }
  
}
</script>
