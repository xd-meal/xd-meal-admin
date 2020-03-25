import { addDish, getDishList } from '@/api/dish'

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
      return new Promise((resolve, reject) => {
        addDish(dish).then(res => {
          commit('APPEND_DISH', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    dishLastFifty: state => {
      return state.list.slice(state.list.length - 50, state.list.length).reverse()
    },
    dishSkipMealId: state => {
      return state.list.find(el => el.title === '今天不吃饭')
    },
    dishInfoById: state => id => {
      return state.list.find(el => el._id === id)
    }
  }
}
