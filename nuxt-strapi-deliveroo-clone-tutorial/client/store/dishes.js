export const state = () => ({
  list: []
})

export const mutations = {
  add(state, dish) {
    state.list.push(dish)
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
