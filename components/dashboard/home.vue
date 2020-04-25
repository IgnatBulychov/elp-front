<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img max-width="130px" height="100px" src="/elp.png"></v-img> 
          <v-card-title>                     
            
            <h1 class="display-1">Elementary Landing Page</h1>
          </v-card-title>
          <v-card-text>
              Links:  <br>
              <v-btn text color="teal" :to="{path:'/dashboard/advantages/new'}">Добавить запись в "преимущества"</v-btn> <br>
              <v-btn text color="teal" :to="{path:'/dashboard/items/new'}">Добавить запись в прайслист</v-btn> <br>
              <v-btn text color="teal" :to="{path:'/dashboard/categories/new'}">Добавить категорию в прайслист</v-btn> <br>
              <v-btn text color="teal" :to="{path:'/dashboard/works/new'}">Добавить запись в портфолио</v-btn> <br>
              <v-btn text color="teal" :to="{path:'/dashboard/reviews/new'}">Добавить отзыв</v-btn> <br>
          
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'home'
}
</script>
