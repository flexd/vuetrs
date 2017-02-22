import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import tickets from './modules/tickets'
import config from './modules/config'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

var plugins = [createPersistedState({paths: ['config']})]
if (debug) plugins.push(createLogger()) 

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tickets,
    config
  },
  strict: debug,
  plugins: plugins
})
