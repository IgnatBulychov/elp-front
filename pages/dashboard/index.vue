<template>
  <div>
  <h1>Добро пожаловать</h1>
  <v-img src="/elp.png"></v-img>

  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  components: {
    
  }
}
</script>
