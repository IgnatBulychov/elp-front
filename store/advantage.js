export const state = () => ({   
    loading: false, 
    advantages: [],
    errors: {
        status: false,
        messages: []
    }
})

export const getters = {
    getAdvantage: (state) => (id) => {
        let advantage = state.advantages.find(advantage => advantage.id == id)
        return advantage
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
    updateAdvantages(state, payload) {
        state.advantages = payload
        state.loading = false
    }
}

export const actions = {
    getAdvantages(context, state) {
        context.commit('loadingActivate')
        context.commit('errorsReset')
        this.$axios.$get('/api/advantages')
        .then((response) => {
            context.commit('updateAdvantages', response.advantages)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newAdvantage(context, formData) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/advantages/new', formData)
        .then(response => {
            app.$router.push('/dashboard/advantages')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateAdvantage(context, [formData, id]) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/advantages/update/' + id, formData)
        .then(response => {
            app.$router.push('/dashboard/advantages')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeAdvantage(context, id) {
        let app = this
        context.commit('loadingActivate')
        context.commit('errorsReset')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/advantages/remove/' + id)
        .then(response => {
            context.dispatch('getAdvantages')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}