export const state = () => ({   
    loading: false, 
    settings: null,
    errors: {
        status: false,
        messages: []
    }
})

export const getters = {
    getSettings: (state) => {
        return state.settings
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
    errorsReset(state) {
        state.errors.status = false
        state.errors.messages = []
    },
    updateSettings(state, payload) {
        state.settings = payload
        state.loading = false
    }
}

export const actions = {
    getSettings(context, state) {
        context.commit('loadingActivate')
        context.commit('errorsReset')
        this.$axios.$get('/api/settings')
        .then((response) => {
            context.commit('updateSettings', response.settings)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateSettings(context, formData) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/settings/update', formData)
        .then(response => {
            context.commit('loadingDeactivate')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}