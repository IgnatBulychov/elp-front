<template>
<div>
  <h1>Landing page</h1>
   <nuxt-link to="/login">Login</nuxt-link>
    <nuxt-link to="/dashboard">Dashboard</nuxt-link>
   </div>
</template>

<script>

export default {
  layout: 'dashboard',  
}
</script>