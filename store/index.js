const cookieparser = process.server ? require('cookieparser') : undefined

export const strict = false

export const state = () => ({   
  categories: []
})

export const mutations = {
  updateCategories(state, payload) {
    state.categories = payload
  }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        console.log('init')
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('auth/setAuth', user)
    },
}