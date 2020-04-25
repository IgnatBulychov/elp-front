<template>
    <v-list flat>

<v-list-item-group color="teal">
        
        <v-list-item :to="{path:'/dashboard/home'}">
          <v-list-item-icon>
            <v-icon>mdi-alpha-e-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{path:'/dashboard/advantages'}">
          <v-list-item-icon>
            <v-icon>mdi-check-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Преимущества</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      <v-list-group
        prepend-icon="mdi-package-variant"
        color="teal"
      >
        <template v-slot:activator>
          <v-list-item-title>Товары и услуги</v-list-item-title>
        </template>

        <v-list-item :to="{path:'/dashboard/categories'}">
          <v-list-item-icon>
           <v-icon>mdi-dat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Категории</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{path:'/dashboard/items'}">
          <v-list-item-icon>
           <v-icon>mdi-dat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Записи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      

      </v-list-group>




         <v-list-item :to="{path:'/dashboard/works'}">
          <v-list-item-icon>
            <v-icon>mdi-image-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Портфолио</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{path:'/dashboard/files'}">
          <v-list-item-icon>
            <v-icon>mdi-image-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Файлы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item :to="{path:'/dashboard/reviews'}">
          <v-list-item-icon>
            <v-icon>mdi-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Отзывы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item :to="{path:'/dashboard/orders'}">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Заявки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        

          <v-list-item :to="{path:'/dashboard/settings'}">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
      name: 'navigation',
    }
</script>
   