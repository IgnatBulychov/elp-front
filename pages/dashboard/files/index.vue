<template>
  <files/>
</template>

<script>
import files from '~/components/dashboard/files/files.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    files
  }
  
}
</script>
