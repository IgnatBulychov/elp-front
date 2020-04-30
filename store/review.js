export const state = () => ({   
    loading: false, 
    reviews: [],
    errors: {
        status: false,
        messages: []
    }
})

export const getters = {
    getReview: (state) => (id) => {
        let review = state.reviews.find(review => review.id == id)
        return review
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
    updateReviews(state, payload) {
        state.reviews = payload
        state.loading = false
    }
}

export const actions = {
    getReviews(context, state) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.$get('/api/reviews')
        .then((response) => {
            context.commit('updateReviews', response.reviews)
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    newReview(context, formData) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/reviews/new', formData)
        .then(response => {
            app.$router.push(app.app.localePath('/dashboard/reviews'))
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    updateReview(context, [formData, id]) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        app.$axios.$post('/api/reviews/update/' + id, formData)
        .then(response => {
            app.$router.push(app.app.localePath('/dashboard/reviews'))
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    },
    removeReview(context, id) {
        let app = this
        context.commit('loadingActivate')
        app.$axios.setToken(context.rootState.auth.user.access_token, 'Bearer')
        this.$axios.$post('/api/reviews/remove/' + id)
        .then(response => {
            context.dispatch('getReviews')
        })
        .catch((error) => {
            context.commit('failed', error)
            context.commit('loadingDeactivate')
        })
    }
}