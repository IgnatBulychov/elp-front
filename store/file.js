export const state = () => ({   
    loading: false, 
    files: [],
    errors: false
})

export const getters = {
   
}

export const mutations = {
    loadingActivate(state) {
        state.loading = true
    },
    loadingDeactivate(state) {
        state.loading = false
    },
    failed (state, error) {
        if (state.errors.status == 401) {
            state.errors = 'Сессия истекла'
        } else {
            state.errors = error
        }
        this.$router.push('/login')
    },
    updateFiles(state, payload) {
        state.files = payload
        state.loading = false
    }
}

export const actions = {
    getFiles(context, state) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$get('/api/files')
        .then((response) => {
            context.commit('updateFiles', response.files)
            context.commit('loadingDeactivate')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newFile(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/files/new', formData)
        .then(response => {
            context.dispatch('getFiles')
            context.commit('loadingDeactivate')
            app.$router.push('/dashboard/files')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeFile(context, id) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/files/remove/' + id)
        .then(response => {
            context.dispatch('getFiles')
            context.commit('loadingDeactivate')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}