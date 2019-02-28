import axios from 'axios'

const state = {
  user: null
}

const mutations = {
  SET_USER (state, user ) {
    state.user = user
    state.user.isAdmin = false
  },

  SET_ADMIN (state) {
    state.user = {
      label: 'admin',
      isAdmin: true
    }
  },

  LOGOUT (state) {
    state.user = null
  }
}

const actions = {
  async login ({ commit }, user) {
    const res = await axios.post('http://localhost:3000/users/login/', {user: user}).then(res => res.data)
    if (res.isAdmin) commit('SET_ADMIN')
    if (res.user && !res.isAdmin) commit('SET_USER', res.user)
  },

  async logout ({ commit }) {
    commit('LOGOUT')
  }
}

const getters = {
  isAdmin: (state) => state.user !== null && state.user.isAdmin,
  isLoggedIn: (state) => state.user !== null,
  user: (state) => state.user
}

export default {
  state,
  getters,
  mutations,
  actions
}
