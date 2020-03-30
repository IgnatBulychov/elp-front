 <template>
 <v-dialog v-model="dialog" scrollable max-width="90%">
      <template v-slot:activator="{ on }">
      

        <v-btn  :disabled="$store.state.work.loading" tile large  text color="teal"  v-on="on">
      <v-icon>mdi-camera</v-icon> Добавить файлы
    </v-btn>

      </template>
      <v-card>
        <v-card-title>Файлы</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="secondary lighten-1" text @click="dialog = false">Отмена</v-btn>
          <v-btn color="teal lighten-1" text @click="dialog = false">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'selectFiles',
    data() {
        return { 
          dialog: false
        };
    }
}
</script>