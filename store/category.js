export const state = () => ({   
    loading: false, 
    categories: [],
    errors: false
})

export const getters = {
    getCategory: (state) => (id) => {
        let category = state.categories.find(category => category.id == id)
        return category
    },
}

export const mutations = {
    loadingActivate(state) {
        state.loading = true
    },
    loadingDeactivate(state) {
        state.loading = false
    },
    failed (state, error) {
        state.errors = error
    },
    updateCategories(state, payload) {
        state.categories = payload
        state.loading = false
    }
}

export const actions = {
    getCategories(context, state) {
        let app = this
        context.commit('loadingActivate')
        this.$axios.$get('/api/categories')
        .then((response) => {
            context.commit('updateCategories', response.categories)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newCategory(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/categories/new', formData)
        .then(response => {
            app.$router.push('/dashboard/categories')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateCategory(context, [formData, id]) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/categories/update/' + id, formData)
        .then(response => {
            app.$router.push('/dashboard/categories')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeCategory(context, id) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/categories/remove/' + id)
        .then(response => {
            context.dispatch('getCategories')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}