<template>
  <works/>
</template>

<script>
import works from '~/components/dashboard/works/works.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    works
  }
}
</script>
