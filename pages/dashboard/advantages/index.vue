<template>
  <advantages/>
</template>

<script>
import advantages from '~/components/dashboard/advantages/advantages.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    advantages
  }
  
}
</script>
