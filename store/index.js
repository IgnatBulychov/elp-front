const cookieparser = process.server ? require('cookieparser') : undefined

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
    }
}