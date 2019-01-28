import AddUser    from '@/views/AddUser.vue'
import UpdateUser from '@/views/UpdateUser.vue'
import UsersList  from '@/views/UsersList.vue'
import Vue        from 'vue'
import Router     from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path     : '/',
      name     : 'Landing',
      component: UsersList
    },
    {
      path     : '/add',
      name     : 'add',
      component: AddUser
    },
    {
      path     : '/update',
      name     : 'update',
      component: UpdateUser
    }
  ]
})
