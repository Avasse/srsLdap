import axios from 'axios'

const state = {
  groups: []
}

const mutations = {
  SET_GROUPS (state, groups) {
    state.groups = groups
  }
}

const actions = {
  async fetchGroups ({ commit }) {
    const res = await axios.get('http://localhost:3000/groups/').then(res => res.data)
    commit('SET_GROUPS', res)
  }
}

const getters = {
  groups: (state) => state.groups
}

export default {
  state,
  getters,
  mutations,
  actions
}
