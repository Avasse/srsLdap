import axios from 'axios'

const state = {
  groups: []
}

const mutations = {
  SET_GROUPS (state, groups) {
    state.groups = groups
  },
  
  ADD_GROUP (state, group) {
    state.groups.push(group)
  },
  
  UPDATE_GROUP (state, group) {
    const id        = state.groups.findIndex(item => item && item.gidNumber && item.gidNumber === group.gidNumber)
    state.groups[id] = group
  },
  
  DELETE_USER (state, group) {
    const id = state.groups.findIndex(item => item && item.gidNumber && item.gidNumber === group.gidNumber)
    state.groups.splice(id, 1)
  }
}

const actions = {
  async fetchGroups ({ commit }) {
    const res = await axios.get('http://localhost:3000/groups/').then(res => res.data)
    commit('SET_GROUPS', res)
  },
  
  async addGroup ({ commit }, group) {
    const res = await axios.put('http://localhost:3000/groups/', { group: group }).then(res => res.error)
    if (res === null) commit('ADD_GROUP', group)
  },
  
  async updateGroup ({ commit }, group) {
    const res = await axios.post('http://localhost:3000/groups/', { group: group }).then(res => res.error)
    if (res === null) commit('UPDATE_GROUP', res)
  },
  
  async deleteGroup ({ commit }, dn) {
    const res = await axios.put('http://localhost:3000/groups/delete', { dn: dn }).then(res => res.error)
    if (res === null) commit('DELETE_GROUP', res)
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
