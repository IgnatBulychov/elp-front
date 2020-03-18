const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
   loading: false,
   user: null,
   errors: null
})

export const getters = {
    getErrors: (state) => {
        return state.errors
    },
}

export const mutations = {
    setAuth (state, user) {
        state.loading = false
        state.user = user
    },
    authFailed (state, error) {
        state.loading = false
        state.user = null
        state.errors = error
    },
    loadingActivate (state) {
        state.loading = true
    }
}

export const actions = {
    login(context, credentials) {
        let app = this
        context.commit('loadingActivate')
        this.$axios.$post('/api/auth/login', credentials) 
        .then((response) => {
            Cookie.set('user', response) 
            context.commit('setAuth', response)
            app.$router.push({path: '/dashboard'})
        })
        .catch((error, response) => {
            console.log(error)
            context.commit('authFailed', error)
        })       
    },
    logout(context) {
        Cookie.remove('user')
        context.commit('setAuth', null)
        this.$router.push('/login');
    }
}


