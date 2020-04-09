 <template>  
  <v-card  min-height="80vh">
    <v-card-title>Файлы</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px;">
      <template v-if="!files.length" > 
        <template v-if="$store.state.file.loading"> 
          <v-row>
            <v-col v-for="n in 4" :key="n" 
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
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
              cols="12"
              sm="6"
              md="4"
              lg="3"
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
      <v-btn color="secondary lighten-1" text @click="cancel">Отмена</v-btn>
      <v-btn color="teal lighten-1" text @click="selectFiles">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'selectFiles',
    props: ['imgDefault'],
    components: {
      serverSideErrors
    },
    data() {
      return { 
        newSelectedFiles: [],
        selectStarted: false

      };
    },
    mounted() {
      if (!this.$store.state.file.files.length) {
        this.$store.dispatch('file/getFiles')
      } 
    },
    computed: {
      files() {
        return this.$store.state.file.files
      },
      selectedFiles: {
        get: function () {
          if (this.selectStarted) {
            return this.newSelectedFiles
          } else {
            if (this.newSelectedFiles.length) {
              console.log('1')
              return this.newSelectedFiles
            } else  {
              let files = []
              this.imgDefault.forEach(function(item, i, arr) {
                let file = {}
                file.id = item.id
                file.src = item.src 
                file.created_at = item.created_at
                file.updated_at = item.updated_at
                files.push(file)
              })
              return files
            }  
          }
        },
        set: function (v) {
          this.selectStarted = true
          this.newSelectedFiles = v
        }
      },
      errorsFromServer: function () {
          return this.$store.state.file.errors
      }
    },
    methods: {
      selectFiles() {        
        this.$emit('imagesSelected', this.selectedFiles)
        this.selectedFiles = []
        this.selectStarted = false
      },
      cancel() {
        this.$emit('cancel')
        this.selectedFiles = []
        this.selectStarted = false
      }
    }
}
</script>

<style scoped>
</style>
