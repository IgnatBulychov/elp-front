<template>
  <div>
    <v-app-bar fixed>
      <v-app-bar-nav-icon 
        class="d-md-none" 
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>      

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">

        <v-divider
          inset
          vertical
        ></v-divider>

        <v-btn 
          text 
          color="cyan darken-2" 
          @click="$vuetify.goTo('#about', { offset: +50,  easing: 'easeInOutCubic' })"
        >About</v-btn>

         <v-divider 
          inset
          vertical
        ></v-divider>

        <v-btn 
          text  
          color="cyan darken-2" 
          v-if="landingData.categories.length" 
          @click="$vuetify.goTo('#items', { offset: +50,  easing: 'easeInOutCubic' })"
        >Our servise</v-btn>

        <v-divider
          v-if="landingData.categories.length" 
          inset
          vertical
        ></v-divider>

        <v-btn 
          text  
          color="cyan darken-2" 
          v-if="landingData.works.length" 
          @click="$vuetify.goTo('#works', { offset: +50,  easing: 'easeInOutCubic' })"
        >Portfolio</v-btn>

        <v-divider 
          v-if="landingData.works.length" 
          inset
          vertical
        ></v-divider>

        <v-btn 
          text  
          color="cyan darken-2" 
          v-if="landingData.reviews.length" 
          @click="$vuetify.goTo('#reviews', { offset: +50,  easing: 'easeInOutCubic' })"
        >Reviews</v-btn>

        <v-divider 
          v-if="landingData.reviews.length" 
          inset
          vertical
        ></v-divider> 

        <v-btn 
          text  
          color="cyan darken-2"  
          @click="$vuetify.goTo('#contacts', { offset: +50,  easing: 'easeInOutCubic' })"
        >Contacts</v-btn>

        <v-divider 
          inset
          vertical
        ></v-divider>
      
    </v-toolbar-items>

    <v-spacer></v-spacer>

  </v-app-bar>

  <v-navigation-drawer
    app
    v-model="drawer"
    disable-resize-watcher 
  >
    <v-list
      nav
      dense
    >
      <v-list-item>
          
        <v-spacer></v-spacer>

          <v-btn icon large @click="drawer = !drawer">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
      </v-list-item>     

      <v-list-item-group> 

          <v-list-item>
            <v-list-item-content
              class="my-3" 
              @click="$vuetify.goTo('#about', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >About</v-list-item-content>
          </v-list-item>

          <v-list-item v-if="landingData.works.length" >
            <v-list-item-content              
              class="my-3" 
              @click="$vuetify.goTo('#works', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >Portfolio</v-list-item-content>
          </v-list-item>

          <v-list-item v-if="landingData.categories.length" >
            <v-list-item-content              
              class="my-3" 
              @click="$vuetify.goTo('#items', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >Our Service</v-list-item-content>
          </v-list-item>

          <v-list-item v-if="landingData.reviews.length" >
            <v-list-item-content
              class="my-3" 
              @click="$vuetify.goTo('#reviews', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >Reviews</v-list-item-content>
          </v-list-item>   

          <v-list-item>
            <v-list-item-content
              class="my-3" 
              @click="$vuetify.goTo('#contacts', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >Contacts</v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content
              class="my-3" 
              @click="$vuetify.goTo('#order', { offset: +50,  easing: 'easeInOutCubic' }); drawer = !drawer"
           >Make order</v-list-item-content>
          </v-list-item>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>      
        
        <v-parallax
          dark          
          v-if="landingData.settings.file" 
          :src='$axios.defaults.baseURL + landingData.settings.file.src.replace("public","/storage")'
          min-height="100%"
        >
          <v-row
            align="center"
          >
            <v-col class="text-center" cols="12" md="6">
              <h1 class="display-2 font-weight-thin mb-4">{{ landingData.settings.title }}</h1>
              <h4 class="subheading">{{ landingData.settings.subtitle }}</h4>
              <v-btn 
                color="white"
                @click="$vuetify.goTo('#about', { offset: +50,  easing: 'easeInOutCubic' })"
                class="mx-3 my-4" 
                outlined
              >more</v-btn> 
              <v-btn 
                color="white"
                class="mx-3 my-4"
                @click="$vuetify.goTo('#order', { offset: +50,  easing: 'easeInOutCubic' })"
              >make order</v-btn>
            </v-col>
          </v-row>
        </v-parallax>     

        <v-row justify="center" id="about">
          <v-col cols="10" md="8">
            <h3 class="display-1 font-weight-thin my-5">About</h3> 
            <v-divider class="my-5"></v-divider> 
          </v-col>
        </v-row>

        <v-row justify="center" >
          <v-col  cols="10" md="8" align="center">     
            <span class="subtitle-1 my-2">{{ landingData.settings.about }}</span>    
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col v-for="advantage in landingData.advantages" :key="advantage.id" cols="10" sm="3" md="3" lg="3"   align="center">
            <v-icon size="72" color="cyan lighten">mdi-{{advantage.icon}}</v-icon><br>
              <span class="subtitle-1  my-5">{{advantage.description}}</span> 
          </v-col>
        </v-row>

        <v-row justify="center" v-if="landingData.categories.length" id="items">
          <v-col cols="10" md="8">
            <h3 class="display-1 font-weight-thin my-5">Our service</h3> 
            <v-divider class="my-5"></v-divider> 
            <v-card>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="category in landingData.categories"
                  :key="category.id"
                >
                  <v-expansion-panel-header>{{category.title}}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Service</th>
                            <th class="text-left">Description</th>
                            <th class="text-left">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in category.items" :key="item.name">
                            <td>{{ item.title }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.cost }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center"  v-if="landingData.works.length" id="works">
          <v-col cols="10" md="8">
            <h3 class="display-1 font-weight-thin my-5">Our works</h3> 
              <v-divider class="my-5"></v-divider> 
              <v-row>
                <v-col v-for="(work, workKey) in landingData.works" :key="work.id" cols="12" sm="6" md="6" lg="4">
                  <v-card class="mx-auto" max-width="344">            
                    <div v-if="work.files.length">
                      <div v-for="(file, fileKey) in work.files" :key="file.id">
                        <v-img v-if="fileKey == 0 && file.src" :src='$axios.defaults.baseURL + file.src.replace("public","/storage")' height="160px"></v-img>
                      </div>
                    </div>
                    <v-card-title>
                      <span class="d-inline-block text-truncate" style="max-width: 100%">
                        {{ work.title }}
                      </span>
                    </v-card-title>
                    <v-card-subtitle>
                      <span class="d-inline-block text-truncate" style="max-width: 100%;">
                        {{ work.description }} 
                      </span>
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="cyan darken-2"
                        text
                        @click.stop="show(workKey)"
                      >
                      More
                      </v-btn>
                    </v-card-actions>
                    <v-dialog
                      v-model="dialogs[workKey]"
                      max-width="80%"
                    >
                      <v-card>
                        <v-card-title class="headline">  
                          {{ work.title }}
                          <v-spacer></v-spacer>
                          <v-btn
                            icon
                            text
                            @click="hide(workKey)"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-card-title>

                        <v-card-text>
                          {{ work.description }}
                        </v-card-text>

                        <v-carousel
                          v-if="work.files.length"
                          cycle
                          height="400"
                          show-arrows-on-hover
                        >
                          <v-carousel-item
                            v-for="file in work.files" :key="file.id"
                          >
                            <v-sheet
                              height="100%"
                            >
                              <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                              >
                                  <v-img :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'></v-img>
                              </v-row>
                            </v-sheet>
                          </v-carousel-item>
                        </v-carousel>                        
                      </v-card>
                    </v-dialog>   
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row justify="center" v-if="landingData.reviews.length" id="reviews">
            <v-col cols="10" md="8">
              <h3 class="display-1 font-weight-thin my-5">Reviews of clients</h3> 
              <v-divider class="my-5"></v-divider>      
              <v-carousel hide-delimiters>
                <v-carousel-item
                  v-for="review in landingData.reviews" :key="review.id"
                >     
                  <v-row
                    class="my-3"
                    align="center"
                    justify="center"        
                    text-center
                  >
                    <v-col 
                      cols="8" 
                      class="mt-3" 
                      align="center"
                      justify="center"        
                      text-center
                    >
                      <p class="title font-weight-light font-italic" >  {{ review.review }}  </p>    
                    </v-col>
                    <v-col 
                      cols="8" 
                      class="mb-2"
                      align="center"
                      justify="center"        
                      text-center
                    >
                      <h4 class="subtitle-1"> {{ review.name }} </h4> 
                    </v-col>
                    <v-col 
                      cols="8"  
                      class="my-2" 
                      align="center"
                      justify="center"        
                      text-center
                    >
                      <div v-if="review.files.length">  
                        <v-avatar  
                          size="120"
                          class="mx-3"
                          v-for="(file, fileKey) in review.files" :key="file.id"
                        >
                          <v-img :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'></v-img>
                        </v-avatar>
                      </div>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>

          <v-row 
            justify="center"      
            id="order" 
          >
            <v-col  cols="10" md="8">
              <h3 class="display-1 font-weight-thin mb-5">Send order</h3> 
              <v-divider class="my-5"></v-divider>      
              <newOrder/>
            </v-col>
          </v-row>

          <v-row 
            justify="center"   
            id="contacts"   
          >
            <v-col cols="10" :md="landingData.settings.map ? '4': '8'">
            <h3 class="display-1 font-weight-thin my-5">Contacts</h3> 
            <v-divider class="my-5"></v-divider>
              <v-list-item v-if="landingData.settings.phone" :href="`tel:+${landingData.settings.phone}`">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-phone</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>+{{landingData.settings.phone}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="landingData.settings.email" :href="`mailto:+${landingData.settings.email}`">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-email</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ landingData.settings.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item  v-if="landingData.settings.viber" :href="`viber://add?number=${landingData.settings.viber}`"> 
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-phone-message-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Viber</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="landingData.settings.telegram" :href="`tg://resolve?domain=${landingData.settings.telegram}`">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-telegram</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Telegram</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="landingData.settings.whatsapp" :href="`whatsapp://send?phone=+${landingData.settings.whatsapp}`">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-whatsapp</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>WhatsApp</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="landingData.settings.facebook" :href="landingData.settings.facebook">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-facebook</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title> {{ landingData.settings.facebook }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="landingData.settings.instagram" :href="landingData.settings.instagram">
                <v-list-item-icon>
                  <v-icon color="cyan darken-2">mdi-instagram</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ landingData.settings.instagram }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col v-if="landingData.settings.map" cols="10" md="4">
              <h3 class="display-1 font-weight-thin my-5">Find us</h3> 
              <v-divider class="my-5"></v-divider>   
              <div v-html="landingData.settings.map"></div>
            </v-col>
          </v-row>
        </v-container>
      </v-content>    
      <v-footer>
        <v-row>
          <v-col cols="12"  class="text-center">
            {{ new Date().getFullYear() }} — <strong>{{ landingData.settings.title }}</strong> <br> 
            <router-link color="cyan" :to="localePath('/login')">Log in</router-link> | <router-link :to="localePath('/dashboard/home')">Dashboard</router-link>
          </v-col>
        </v-row>
      </v-footer>
  </div>
</template>

<script>
import newOrder from '~/components/dashboard/orders/new.vue'

export default {
  layout: 'landing',  
  components: {
    newOrder
  },
  async asyncData({ $axios })  {
    let dataAdvantages = await $axios.$get('/api/advantages')
    let dataCategories = await $axios.$get('/api/categories')
    let dataReviews = await $axios.$get('/api/reviews')
    let dataWorks = await $axios.$get('/api/works')
    let dataSettings = await $axios.$get('/api/settings')
    return { 
      landingData: {
        categories: dataCategories.categories,
        reviews: dataReviews.reviews,
        works: dataWorks.works,
        advantages: dataAdvantages.advantages,
        settings: dataSettings.settings
      } 
    }
  },  
  data() {
      return {
        drawer: false,
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-google-plus',
          'mdi-linkedin',
          'mdi-instagram',
        ],
        overlay: false,
        dialogsTemp: []
      }
  },
  head () {
    return {
      title: this.landingData.settings.title,      
    }
  },
  computed: {
    dialogs() {
        if (this.dialogsTemp.length) {
          return this.dialogsTemp
        } else {
          let dialogs = []
          for (let i = 0; i < this.landingData.works.length; i++) { 
             dialogs.push(false)
          }
          return dialogs
        }
      }
     
  },
  methods: {
    show(el) {
      let dialogs = []
      for (let i = 0; i < this.landingData.works.length; i++) { 
        if (i == el) {
          dialogs.push(true)
        } else {
          dialogs.push(false)
        }
      }
      this.dialogsTemp = dialogs
    },
    hide(el) {
      let dialogs = []
      for (let i = 0; i < this.landingData.works.length; i++) { 
        if (i == el) {
          dialogs.push(false)
        }
      }
      this.dialogsTemp = dialogs
    }
  }  
}
</script>

<style scoped>
.container {
  padding: 0;
}
.v-parallax {
  height: 100vh !important;
}
#order, #contacts {
  min-height: 100vh;
}
</style>
