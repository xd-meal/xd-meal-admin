import { getDiningList } from '@/api/dining'
import Vue from 'vue'
export default {
  state: {
    list: {}
  },
  mutations: {
    SET_DINING_LIST: (state, dinings) => {
      dinings.forEach(el => {
        Vue.set(state.list, el._id, el)
      })
    },
    APPEND_DINING: (state, dining) => {
      // state.list.push(dining)
    }
  },
  actions: {
    FetchDiningList ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getDiningList(payload[0], payload[1]).then(res => {
          commit('SET_DINING_LIST', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppendDining ({ commit }, dining) {
      commit('APPEND_DINING', dining)
    }
  }
}
