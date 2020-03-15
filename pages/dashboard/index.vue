<template>
<div>
  <h1>Dashb</h1>
  Добро пожаловать админ
   <nuxt-link to="/nuxt">Home page</nuxt-link>
   <example/>
   </div>
</template>

<script>
import example from '~/components/example.vue'

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    example
  }
  
}
</script>
