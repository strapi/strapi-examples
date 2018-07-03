import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let card = []
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      user = (parsed.user && JSON.parse(parsed.user)) || null
      card = (parsed.card && JSON.parse(parsed.card)) || []
    }

    commit('auth/setUser', user)
    commit('card/setItems', card)
  }
}
