export const state = () => ({   
    loading: false, 
    items: [],
    errors: false
})

export const getters = {
    getItem: (state) => (id) => {
        let item = state.items.find(item => item.id == id)
        return item
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
    updateItems(state, payload) {
        state.items = payload
        state.loading = false
    }
}

export const actions = {
    getItems(context, state) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.$get('/api/items')
        .then((response) => {
            context.commit('updateItems', response.items)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newItem(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/items/new', formData)
        .then(response => {
            app.$router.push('/dashboard/items')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateItem(context, [formData, id]) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/items/update/' + id, formData)
        .then(response => {
            app.$router.push('/dashboard/items')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeItem(context, id) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/items/remove/' + id)
        .then(response => {
            context.dispatch('getItems')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}