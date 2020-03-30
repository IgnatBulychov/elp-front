export const state = () => ({   
    loading: false, 
    works: [],
    errors: {
        status: false,
        messages: []
    }
})

export const getters = {
    getWork: (state) => (id) => {
        let work = state.works.find(work => work.id == id)
        return work
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
    updateWorks(state, payload) {
        state.works = payload
        state.loading = false
    }
}

export const actions = {
    getWorks(context, state) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.$get('/api/works')
        .then((response) => {
            context.commit('updateWorks', response.works)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newWork(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/works/new', formData)
        .then(response => {
            app.$router.push('/dashboard/works')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateWork(context, [formData, id]) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/works/update/' + id, formData)
        .then(response => {
            app.$router.push('/dashboard/works')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeWork(context, id) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/works/remove/' + id)
        .then(response => {
            context.dispatch('getWorks')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}