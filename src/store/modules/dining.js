import { getDiningList } from '@/api/dining'

export default {
  state: {
    list: {}
  },
  mutations: {
    SET_DINING_LIST: (state, dinings) => {
      this.$set(state, 'list', dinings)
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
