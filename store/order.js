export const state = () => ({   
    loading: false, 
    orders: [],
    success: {
        status: false,
        messages: ''
    },
    errors: {
        status: false,
        messages: []
    }
})

export const mutations = {
    loadingActivate(state) {
        state.loading = true
    },
    loadingDeactivate(state) {
        state.loading = false
    },
    failed (state, error) {
        console.log(1)
        state.errors.messages = []
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    state.errors.messages.push('Время сессии истекло')
                    this.$router.push('/login')   
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
    errorsReset(state) {
        state.errors.status = false
        state.errors.messages = []
    },
    updateOrders(state, payload) {
        state.orders = payload
        state.loading = false
    },
    orederCreated(state) {
        state.success.status = true
        state.success.message = 'Ваша зявка успешно отправлена. Мы свяжемся с Вами в ближайшее время!'
        state.loading = false
    }
}

export const actions = {
    getOrders(context, state) {
        context.commit('loadingActivate')
        context.commit('errorsReset')
        this.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$get('/api/orders')
        .then((response) => {
            context.commit('updateOrders', response.orders)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newOrder(context, formData) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
        app.$axios.$post('/api/orders/new', formData)
        .then(response => {
            context.commit('orederCreated')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeOrder(context, id) {
        context.commit('loadingActivate')
        context.commit('errorsReset')
        this.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/orders/remove/' + id)
        .then(response => {
            context.dispatch('getOrders')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}