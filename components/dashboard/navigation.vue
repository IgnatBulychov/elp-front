<i18n>
{
  "en": {
    "main": "Main",
    "advantages": "Advantages",
    "products-service": "Products and service",
    "categories": "Categories",
    "items": "Items",
    "portfolio": "Portfolio",
    "files": "Files",
    "reviews": "Reviews",
    "orders": "Orders",
    "settings": "Settings"
  },
  "ru": {
    "main": "Главная",
    "advantages": "Преимущества",
    "products-service": "Товары и услуги",
    "categories": "Категории",
    "items": "Записи",
    "portfolio": "Портфолио",
    "files": "Файлы",
    "reviews": "Отзывы",
    "orders": "Заказы",
    "settings": "Настройки"
  },
  "fi": {
    "main": "Pääsivu",
    "advantages": "Edut",
    "products-service": "Tuotteet ja palvelut", 
    "categories": "Luokat",
    "items": "Tuotteet",
    "portfolio": "Salkku",
    "files": "Tiedostot",
    "reviews": "Arvostelut",
    "orders": "Tilaukset",
    "settings": "Asetukset"
  }
}
</i18n>

<template>
  <v-list flat>
    <v-list-item-group color="teal"> 

      <v-list-item :to="localePath('/dashboard/home')">
        <v-list-item-icon>
          <v-icon>mdi-alpha-e-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content> 
          <v-list-item-title>{{ $t('main') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="localePath('/dashboard/advantages')">
        <v-list-item-icon>
          <v-icon>mdi-check-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('advantages') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        prepend-icon="mdi-package-variant"
        color="teal"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ $t('products-service') }}</v-list-item-title>
        </template>

        <v-list-item :to="localePath('/dashboard/categories')">
          <v-list-item-icon>
           <v-icon>mdi-dat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('categories') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath('/dashboard/items')">
          <v-list-item-icon>
           <v-icon>mdi-dat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('items') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>      

      </v-list-group>

      <v-list-item :to="localePath('/dashboard/works')">
        <v-list-item-icon>
          <v-icon>mdi-image-multiple-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('portfolio') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="localePath('/dashboard/files')">
        <v-list-item-icon>
          <v-icon>mdi-image-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('files') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="localePath('/dashboard/reviews')">
        <v-list-item-icon>
          <v-icon>mdi-account-details-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('reviews') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="localePath('/dashboard/orders')">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-text-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('orders') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>        

      <v-list-item :to="localePath('/dashboard/settings')">
        <v-list-item-icon>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('settings') }}</v-list-item-title>
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
   