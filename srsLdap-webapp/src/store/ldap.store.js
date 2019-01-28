import axios from 'axios'

const state = {
  users: {}
}

const getters = {}

const mutations = {}

const actions = {
  addUser ({ commit }, user) {
    const data = axios.put('http://localhost:3000/users/').then(res => console.log(res))
  },
  
  updateUser ({ commit }, user) {
    const data = axios.post('http://localhost:3000/users/').then(res => console.log(res))
  },
  
  deleteUser ({ commit }, user) {
    const data = axios.delete('http://localhost:3000/users/').then(res => console.log(res))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
