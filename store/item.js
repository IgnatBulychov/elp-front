export const state = () => ({   
    loading: false, 
    items: [],
    errors: {
        status: false,
        messages: []
    }
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
        console.log(1)
        let app = this
        state.errors.messages = []
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    state.errors.messages.push('Время сессии истекло')
                    app.$router.push(app.app.localePath('/login'))
                    break;
                case 400:
                    console.log(400)
                    JSON.parse(error.response.data.errors).forEach(function(item, i, arr) {
                        state.errors.messages.push(item)
                    });  
                    state.errors.status = true
                    break;
                case 500:
                    state.errors.status = true
                    state.errors.messages.push('Неверный запрос')
                    break;
                default:
                    console.log(3)
                    state.errors.status = true
                    state.errors.messages.push(error)
            }
        } else {
            console.log(1)
            state.errors.status = true
            state.errors.messages.push(error)
        }  
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
            app.$router.push(app.app.localePath('/dashboard/items'))
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
            app.$router.push(app.app.localePath('/dashboard/items'))
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