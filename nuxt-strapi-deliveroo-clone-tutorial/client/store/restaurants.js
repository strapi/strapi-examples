export const state = () => ({
  list: []
})

export const mutations = {
  add(state, restaurant) {
    state.list.push(restaurant)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
