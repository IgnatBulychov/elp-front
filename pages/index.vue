<template>
<div>
  <h1>Landing page</h1>
   <nuxt-link to="/login">Login</nuxt-link>
    <nuxt-link to="/dashboard">Dashboard</nuxt-link>
   <example/>
   </div>
</template>

<script>
import example from '~/components/example.vue'

export default {
  layout: 'dashboard',
  components: {
    example
  }
  
}
</script>