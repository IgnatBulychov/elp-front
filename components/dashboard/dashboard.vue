<i18n>
{
  "en": {
    "dashboard": "Dashboard",
    "view-site": "View site",
    "logout": "Logout"
  },
  "ru": {
    "dashboard": "Управление",
    "view-site": "Просмотр сайта",
    "logout": "Выход"
  },
  "fi": {
    "dashboard": "Kojelauta",
    "view-site": "Näytä sivusto",
    "logout": "Kirjautua ulos"
  }
}
</i18n>

<template>
  <v-app>
    <v-navigation-drawer
      app 
      mobile-break-point="720" 
      v-model="drawer"
    > 
      <v-list-item>

        <v-btn  
          v-if="drawer"
          color="teal"
          @click.stop="drawer = false"
          icon
        >
           <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $t('dashboard') }}
          </v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>

      <v-divider>
      </v-divider>      

      <navigation></navigation>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block :to="localePath('/')">{{ $t('view-site') }}
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn block @click="logout">{{ $t('logout') }}
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </div>
      </template>
      
    </v-navigation-drawer>

    <v-app-bar app>

      <v-btn
        v-if="!drawer"
        color="teal"
        @click.stop="drawer = !drawer"
        icon
        >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <div class="flex-grow-1">
      </div>

      <v-toolbar-items>
        <v-btn text small v-if="$i18n.locale != 'en'" :to="switchLocalePath('en')">English</v-btn>  
        <v-btn text small v-if="$i18n.locale != 'ru'" :to="switchLocalePath('ru')">Русский</v-btn>  
        <v-btn text small v-if="$i18n.locale != 'fi'" :to="switchLocalePath('fi')">Suomen</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
      <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navigation from './navigation.vue'
export default {
    name: 'dashboard',
    components: {
      navigation
    },
    data () {
        return {
                  drawer: true,
            }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
        }            
    }
}
</script>
