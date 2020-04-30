<template>
  <div> 
    <v-card :elevation="2">
      <v-card-text>
        <v-form
          @submit.prevent="update"
          ref="form"
        >
          <v-text-field
            v-model="category.title"
            :rules="titleRules"
            required
            :disabled="$store.state.category.loading"
            :label="$t('title')"
          ></v-text-field>

          <v-btn
            @click="$router.push(localePath('/dashboard/categories'))"  
            color="secondary"
            :disabled="$store.state.category.loading"
          >{{ $t('cancel') }}</v-btn>

          <v-btn
            type="submit"
            color="teal"
            :disabled="$store.state.category.loading"
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
  name: 'updateCategory',
  components: {
    serverSideErrors
  },
  data() {
      return {
          category: {
              title: ''
          },
          titleRules: [
            v => !!v || this.$t('title-req'),
            v => (v && v.length <= 256) || this.$t('title-req')
          ]
      }
  },
  created() {           
    if (this.$store.state.category.categories.length) {
        this.category = this.$store.getters['category/getCategory'](this.$route.params.id)
    } else {
        this.$store.commit('category/loadingActivate')
        this.$axios.$get(`/api/categories/${this.$route.params.id}`)
        .then((response) => {
            this.category = response.category
            this.$store.commit('category/loadingDeactivate')
        });
    }
  },
  computed: {
      errorsFromServer: function () {
          return this.$store.state.category.errors
      }
  },
  methods: {
    update() {
      let app = this     
      if (this.$refs.form.validate()) {            
        const formData = new FormData();
        formData.append("category", JSON.stringify(app.category))
        app.$store.dispatch('category/updateCategory', [formData, app.$route.params.id])  
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('category/loadingDeactivate')
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