const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
   loading: false,
   user: null
})

export const mutations = {
    setAuth (state, user) {
        state.loading = false
        state.user = user
    },
    authFailed (state) {
        state.loading = false
        state.user = null
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
        .catch((err) => {
            console.log(err)
            context.commit('authFailed')
        })       
    },
    logout(context) {
        Cookie.remove('user')
        context.commit('setAuth', null)
        this.$router.push('/login');
    }
}


