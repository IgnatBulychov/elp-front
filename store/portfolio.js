export const state = () => ({   
    loading: false, 
    portfolioItems: []
})

export const getters = {
    portfolioItems (state) {
        return state.portfolioItems
    },
}

export const mutations = {
    updatePortfolioItems(state, payload) {
        state.portfolioItems = payload
        state.loading = false
    }
}

export const actions = {
    getPortfolioItems(context) {
        context.state.loading = true
        
        this.$axios.$get('/api/portfolioitems')
        .then((response) => {
            console.log(response[0])
            context.commit('updatePortfolioItems', response[0])
        })
    },
    removePortfolioItem(context, id) {
        context.state.loading = true
        this.$axios.$post('/api/portfolioitems/remove/' + id)
        .then(response => {
            context.dispatch('getPortfolioItems')
        })
    }
}