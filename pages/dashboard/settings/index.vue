<template>
  <settings/>
</template>

<script>
import settings from '~/components/dashboard/settings.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    settings
  }
}
</script>
