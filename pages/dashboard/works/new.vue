<template>
  <newWork/>
</template>

<script>
import newWork from '~/components/dashboard/works/new.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    newWork
  }
  
}
</script>
