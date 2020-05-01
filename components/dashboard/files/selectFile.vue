 <template>  
  <v-card  min-height="80vh">
    <v-card-title>{{ $t('images') }}</v-card-title>
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
          <div class="text-center my-2">
            {{ $t('no-files') }}
          </div>
        </template>      
      </template>
      <template v-else>  
        <v-container fluid>
          <v-radio-group v-model="selectedFile" row>
            <v-col
              v-for="(file, index) in files" :key="file.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>                        
                <v-img
                  :src='file.src'
                  class="white--text align-end"
                  height="160px"
                ></v-img>

                <v-card-actions>
                   <v-radio :value="file" class="mx-auto" color="teal"></v-radio>
                </v-card-actions>
                                          
              </v-card>
            </v-col>
          </v-radio-group>
        </v-container>
      </template>     
          
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="secondary lighten-1" text @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-btn color="teal lighten-1" text @click="selectFile">{{ $t('add') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
    name: 'selectFile',
    components: {
      serverSideErrors
    },
    data() {
      return { 
        newSelectedFile: [],
        selectStarted: false,
        selectedFile: null
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
      errorsFromServer: function () {
          return this.$store.state.file.errors
      }
    },
    methods: {
      selectFile() {          
          this.$emit('imageSelected', this.selectedFile)
          this.selectedFile = null
          this.selectStarted = false
      },
      cancel() {
        this.$emit('cancel')
        this.selectedFile = null
        this.selectStarted = false
      }
    }
}
</script>

<style scoped>
</style>
