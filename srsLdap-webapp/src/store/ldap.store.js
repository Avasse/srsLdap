import axios from 'axios'

const state = {
  users: []
}

const mutations = {
  SET_USERS (state, users) {
    state.users = users
  },
  
  ADD_USER (state, user) {
    state.users.push(user)
  },
  
  UPDATE_USER (state, user) {
    const id        = state.users.findIndex(item => item && item.uid && item.uid === user.uid)
    state.users[id] = user
  },
  
  DELETE_USER (state, user) {
    const id = state.users.findIndex(item => item && item.uid && item.uid === user.uid)
    state.users.splice(id, 1)
  }
}

const actions = {
  async fetchUsers ({ commit }, uid) {
    const res = await axios.get('http://localhost:3000/users/', uid).then(res => {
      console.log(res.data)
      return res.data
    })
    commit('SET_USERS', res)
  },

  async addUser ({ commit }, user) {
    const res = axios.put('http://localhost:3000/users/', user).then(res => res.error)
    if (res === null) commit('ADD_USER', user)
  },
  
  async updateUser ({ commit }, user) {
    const res = await axios.post('http://localhost:3000/users/', user).then(res => res.error)
    if (res === null) commit('UPDATE_USER', res)
  },
  
  async deleteUser ({ commit }, dn) {
    const res = await axios.delete('http://localhost:3000/users/', dn).then(res => res.error)
    if (res === null) commit('DELETE_USER', res)
  }
}

const getters = {
  users: (state) => state.users
}

export default {
  state,
  getters,
  mutations,
  actions
}
