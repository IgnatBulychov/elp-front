<template>
  <updateCategory/>
</template>

<script>
import updateCategory from '~/components/dashboard/categories/update.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    updateCategory
  }
  
}
</script>
