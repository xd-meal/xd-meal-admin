import { addDining, getDiningList, deleteDining, generatePoster } from '@/api/dining'
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
      Vue.set(state.list, dining._id, dining)
    },
    DELETE_DINING: (state, diningID) => {
      Vue.delete(state.list, diningID)
    },
    SET_POSTER_GENERATED: (state, diningID) => {
      Vue.set(state.list.diningID, 'posterGenerated', true)
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
      return new Promise((resolve, reject) => {
        addDining(dining).then(res => {
          commit('APPEND_DINING', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteDining ({ commit }, diningID) {
      return new Promise((resolve, reject) => {
        deleteDining(diningID).then(res => {
          commit('DELETE_DINING', diningID)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GeneratePoster ({ commit }, diningID) {
      return new Promise((resolve, reject) => {
        generatePoster(diningID).then(res => {
          commit('SET_POSTER_GENERATED', diningID)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
