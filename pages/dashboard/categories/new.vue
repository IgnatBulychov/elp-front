<template>
  <newCategory/>
</template>

<script>
import newCategory from '~/components/dashboard/categories/new.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    newCategory
  }
  
}
</script>
