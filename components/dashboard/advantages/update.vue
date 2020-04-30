<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
          ref="form"
        >
          <v-text-field
            v-model="advantage.description"
            :rules="descriptionRules"
            required
            :disabled="$store.state.advantage.loading"
            :label="$t('text')"
          ></v-text-field>

           <v-text-field
            v-model="advantage.icon"
            :rules="iconRules"
            required
            :disabled="$store.state.advantage.loading"
            :label="$t('icon')"
          ></v-text-field>

          <span class="my-2">
            <a href="https://materialdesignicons.com/">materialdesignicons.com</a> 
          </span><br> 

          <v-btn
            @click="$router.push(localePath('/dashboard/advantages'))"  
            color="secondary"
            :disabled="$store.state.advantage.loading"
          >{{ $t('cancel') }}</v-btn>

          <v-btn
            type="submit"
            color="teal"
            :disabled="$store.state.advantage.loading"
          >{{ $t('update') }}</v-btn>

        </v-form>
      </v-card-text>
    </v-card>    
    <serverSideErrors :errors="errorsFromServer"/>
  </div>
</template>

<script>
import serverSideErrors from '~/components/serverSideErrors.vue'
export default {
  name: 'updateAdvantage',
  components: {
    serverSideErrors
  },
  data() {
      return {
          advantage: {
              description: '',
              icon: ''
          },
           descriptionRules: [
            v => !!v || this.$t('text-req'),
            v => (v && v.length <= 256) || this.$t('text-max'),
          ],
          iconRules: [
            v => !!v || this.$t('icon-req'),
            v => (v && v.length <= 20) || this.$t('icon-max'),
          ]
      }
  },
  created() {           
    if (this.$store.state.advantage.advantages.length) {
        this.advantage = this.$store.getters['advantage/getAdvantage'](this.$route.params.id)
    } else {
        this.$store.commit('advantage/loadingActivate')
        this.$axios.$get(`/api/advantages/${this.$route.params.id}`)
        .then((response) => {
            this.advantage = response.advantage
            this.$store.commit('advantage/loadingDeactivate')
        });
    }
  },
  computed: {
      errorsFromServer: function () {
          return this.$store.state.advantage.errors
      }
  },
  methods: {
    update() {
      let app = this     
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("advantage", JSON.stringify(app.advantage))
        app.$store.dispatch('advantage/updateAdvantage', [formData, app.$route.params.id])  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('advantage/loadingDeactivate')
      }
    }
  }
} 
</script>

<style scoped>
.theme--light.v-btn {
    color: white
}
</style>