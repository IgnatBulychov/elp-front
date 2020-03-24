export const state = () => ({   
    loading: false, 
    categories: [],
    errors: {
        status: false,
        messages: []
    }
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
        if (error.response) {
            if (error.response.status === 401) {
              state.errors.messages.push('Время сессии истекло')
              this.$router.push({path: '/login'})   
            } else if (error.response.status === 400) {
                JSON.parse(error.response.data.errors).forEach(function(item, i, arr) {
                    state.errors.messages.push(item)
                });  
                state.errors.status = true
            } else {
                state.errors.status = true
                state.errors.messages.push(error)
            }
        } else {
            state.errors.status = true
            state.errors.messages.push(error)
        }  
    },
    errorsReset(state) {
        state.errors.status = false
        state.errors.messages = []
    },
    updateCategories(state, payload) {
        state.categories = payload
        state.loading = false
    }
}

export const actions = {
    getCategories(context, state) {
        context.commit('loadingActivate')
        context.commit('errorsReset')
        this.$axios.$get('/api/categories')
        .then((response) => {
            context.commit('updateCategories', response.categories)
        })
        .catch((error) => {
            console.log('ВОТ ОНА')
            console.log(error)
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newCategory(context, formData) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
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
        context.commit('errorsReset')
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
        context.commit('errorsReset')
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