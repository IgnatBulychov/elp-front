<template>
  <updateWork/>
</template>

<script>
import updateWork from '~/components/dashboard/works/update.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    updateWork
  }
}
</script>
