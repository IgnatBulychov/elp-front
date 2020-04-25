<template>
   <dashboard/>
</template>

<script>
import dashboard from '~/components/dashboard/dashboard.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    dashboard
  }
}
</script>
