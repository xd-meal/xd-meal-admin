import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import dish from './modules/dish'
import dining from './modules/dining'
import department from './modules/department'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    dish,
    department,
    dining
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
