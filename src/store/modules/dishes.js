export default {
  state: {
    list: []
  },
  mutations: {
    SET_DISHES: (state, dishes) => {
      state.list = dishes
    },
    APPEND_DISH: (state, dish) => {
      state.list.push(dish)
    }
  },
  actions: {
    SetDishes ({ commit }, dishes) {
      commit('SET_DISHES', dishes)
    },
    AppendDish ({ commit }, dish) {
      commit('APPEND_DISH', dish)
    }
  }
}
