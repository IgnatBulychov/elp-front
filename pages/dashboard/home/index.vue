<template>
  <home/>
</template>

<script>
import home from '~/components/dashboard/home.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    home
  }
}
</script>
