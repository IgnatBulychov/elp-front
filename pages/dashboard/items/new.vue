<template>
  <newItem/>
</template>

<script>
import newItem from '~/components/dashboard/items/new.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    newItem
  }
  
}
</script>
