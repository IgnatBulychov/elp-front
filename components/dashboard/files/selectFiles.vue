 <template>
  <v-dialog v-model="dialog" scrollable max-width="90%">
    <template v-slot:activator="{ on }">     
     
            <v-btn  v-on="on" outlined color="teal"> 
            <v-icon class="mr-3" >mdi-image-plus</v-icon> Добавить Файлы
          
      </v-btn>
    </template>
      <v-card  min-height="80vh">
        <v-card-title>Файлы</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">


          <template v-if="!files.length" > 
          <template v-if="$store.state.file.loading"> 
            <v-row>
              <v-col v-for="n in 3" :key="n" cols="4">
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <div  class="text-center">
              Пока файлов нет
            </div>
          </template>      
        </template>
        <template v-else>  
          <v-container fluid>
            <v-row dense>
              <v-col
                v-for="(file, index) in files" :key="file.id"
                :cols="3"
              >
                <v-card>
                     
                        
                  <v-img
                    :src='$axios.defaults.baseURL + file.src.replace("public","/storage")'
                    class="white--text align-end"
                    height="160px"
                  ></v-img>

                  <v-card-actions>
                    <v-checkbox v-model="selectedFiles" :value="file" class="mx-auto" color="teal"></v-checkbox>
                  </v-card-actions>
                          
                      
                  </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>     
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="secondary lighten-1" text @click="dialog = false">Отмена</v-btn>
          <v-btn color="teal lighten-1" text @click="selectFiles">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'selectFiles',
    components: {
      serverSideErrors
    },
    data() {
        return { 
          dialog: false,
          selectedFiles: []
        };
    },
    mounted() {
      this.$store.dispatch('file/getFiles')
    },
    computed: {
      files() {
        return this.$store.state.file.files
      },
      errorsFromServer: function () {
          return this.$store.state.file.errors
      }
    },
    methods: {
      selectFiles() {        
        this.$emit('imagesSelected', this.selectedFiles)
        this.dialog = false
      }
    }
}
</script>

<style scoped>
</style>
