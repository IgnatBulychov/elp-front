<template>
  <items/>
</template>

<script>
import items from '~/components/dashboard/items/items.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    items
  }
  
}
</script>
