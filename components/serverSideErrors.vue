<template>
<div>
    <v-snackbar
      v-model="errors.status"
      :timeout="5000"
      :top="true"
      color="error"
    >
      <ul>
        <li v-for="error in errors.messages" :key="error.id">
          {{ error }}
        </li>
      </ul>
      
      <v-btn
        color="white"
        text
        @click="errors.status = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar> 
</div>
</template>

<script>
export default {
    name: 'serverSideErrors',
    props: ['errors']
}
</script>