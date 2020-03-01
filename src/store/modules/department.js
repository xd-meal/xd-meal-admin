export default {
  state: {

  },
  mutations: {
    SET_DEPARTMENT: (state, payload) => {
      state[payload.corp] = payload.tree
    }
  },
  actions: {
    SetDepartment ({ commit }, payload) {
      commit('SET_DEPARTMENT', payload)
    }
  }
}
