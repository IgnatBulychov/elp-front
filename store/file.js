export const state = () => ({   
    loading: false, 
    files: [],
    errors: {
        status: false,
        messages: []
    }
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
        context.commit('loadingActivate')
        this.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
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