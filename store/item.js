export const state = () => ({
    items: []
})

export const getters = {
    getItems (state) {
        return state.items
    },
}

export const mutations = {
    updateItems(state, payload) {
        state.price = payload
        state.loading = false
    },
}

export const actions = {
    getItems(context) {
        console.log('getprice')
        context.state.loading = true
        this.$axios.$get('/api/price')
        .then((response) => {
            context.commit('updatePrice', response.data.price)
            
        console.log(response.data.price)
        })
    },
}


/*
let store = {
    state() {
    return  {
       
        portfolioItems: [],
        priceCategories: [],
        priceItems: []
        
    }},
    getters: {
       
        portfolioItems (state) {
            return state.portfolioItems
        },
        
       priceCategories (state) {
            return state.priceCategories
        },
        priceItems (state) {
            return state.priceItems
        }

    },
    mutations: {
        
        updatePortfolioItems(state, payload) {
            state.portfolioItems = payload
            state.loading = false
        },
        
        updatePriceCategories(state, payload) {
            state.priceCategories = payload
            state.loading = false
        },
        updatePriceItems(state, payload) {
            state.priceItems = payload
            state.loading = false
        }
    },
   
    actions: {
        
        getPortfolioItems(context) {
            context.state.loading = true
            axios.get('/api/portfolioitems')
            .then((response) => {
                context.commit('updatePortfolioItems', response.data.portfolioItems)
            })
        },
        removePortfolioItem(context, id) {
            context.state.loading = true
            axios.post('/api/portfolioitems/remove/' + id)
            .then(response => {
                context.dispatch('getPortfolioItems')
            })
        },
        getPriceCategories(context) {
            context.state.loading = true
            axios.get('/api/pricecategories')
            .then((response) => {
                context.commit('updatePriceCategories', response.data.priceCategories)
            })
        },
        
        removePriceCategory(context, id) {
            context.state.loading = true
            axios.post('/api/pricecategories/remove/' + id)
            .then(response => {
                context.dispatch('getPriceCategories')
            })
        },
        getPriceItems (context, id) {
            context.state.loading = true
            console.log('1111111111----' + id)
            axios.get('/api/priceitems/' + id)
            .then((response) => {
                context.commit('updatePriceItems', response.data.priceItems)
            })
        },
        removePriceItem(context, data) {
            console.log('!!!!!!!!!-' + data)
            context.state.loading = true
            axios.post('/api/priceitems/remove/' + data.id)
            .then(response => {
                context.dispatch('getPriceItems', data.currentCategory)
            })
        },
        
    }
};
*/