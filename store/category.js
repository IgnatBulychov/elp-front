export const state = () => ({   
    loading: false, 
    categories: []
})

export const mutations = {
    loadingActivate(state) {
        state.loading = true
    },
    updateCategories(state, payload) {
        state.categories = payload
        state.loading = false
    }
}

export const actions = {
    getCategories(context) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$get('/api/categories')
        .then((response) => {
            context.commit('updateCategories', response.categories)
        })
    },
    newCategory(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.$post('/api/categories/new', formData)
        .then(response => {
            app.$router.push('/dashboard/categories')
        })
    },
    removeCategory(context, id) {
        context.commit('loadingActivate')
        this.$axios.$post('/api/categories/remove/' + id)
        .then(response => {
            context.dispatch('getCategories')
        })
    }
}