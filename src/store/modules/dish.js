import { getDishList } from '@/api/dish'

export default {
  state: {
    list: []
  },
  mutations: {
    SET_DISH_LIST: (state, dishes) => {
      state.list = dishes
    },
    APPEND_DISH: (state, dish) => {
      state.list.push(dish)
    }
  },
  actions: {
    FetchDishList ({ commit }) {
      return new Promise((resolve, reject) => {
        getDishList().then(res => {
          commit('SET_DISH_LIST', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppendDish ({ commit }, dish) {
      commit('APPEND_DISH', dish)
    }
  }
}
