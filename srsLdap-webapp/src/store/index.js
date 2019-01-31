import Vue  from 'vue'
import Vuex from 'vuex'
import ldap from './ldap.store'
import user from './user.store'

Vue.use(Vuex)

const stores = {
  user,
  ldap
}

const state     = {}
const getters   = {}
const mutations = {}
const actions   = {}

const modules = Object.entries(stores).reduce((modules, [name, store]) => {
  modules[name] = {
    namespaced: true,
    ...store
  }
  return modules
}, {})


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
