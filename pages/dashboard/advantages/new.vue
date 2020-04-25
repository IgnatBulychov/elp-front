<template>
  <newAdvantage/>
</template>

<script>
import newAdvantage from '~/components/dashboard/advantages/new.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    newAdvantage
  }
  
}
</script>
