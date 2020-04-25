<template>
  <updateAdvantage/>
</template>

<script>
import updateAdvantage from '~/components/dashboard/advantages/update.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    updateAdvantage
  }
  
}
</script>
