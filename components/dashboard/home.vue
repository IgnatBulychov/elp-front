<template>
  <v-card>
    <v-card-title>                     
      <v-img max-width="130px" height="100px" src="/elp.png"></v-img> 
      <h1 class="display-1">Elementary Landing Page</h1>
    </v-card-title>
    <v-card-text>
      {{ $t('links') }}<br>
      <v-btn text color="teal" :to="localePath('/dashboard/advantages/new')">
        {{ $t('add-adv') }}
      </v-btn> <br>
      <v-btn text color="teal" :to="localePath('/dashboard/items/new')">
        {{ $t('add-item') }}
      </v-btn> <br>
      <v-btn text color="teal" :to="localePath('/dashboard/categories/new')">
        {{ $t('add-cat') }}
      </v-btn> <br>
      <v-btn text color="teal" :to="localePath('/dashboard/works/new')">
        {{ $t('add-port') }}
      </v-btn> <br>
      <v-btn text color="teal" :to="localePath('/dashboard/reviews/new')">
        {{ $t('add-review') }}
      </v-btn> <br>      
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'home'
}
</script>
