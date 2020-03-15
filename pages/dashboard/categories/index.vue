<template>
  <categories/>
</template>

<script>
import categories from '~/components/dashboard/categories/categories.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    categories
  }
  
}
</script>
