import Users from '@/views/Users'
import Groups from '@/views/Groups'
import Vue       from 'vue'
import Router    from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path     : '/',
      name     : 'Users',
      component: Users
    },
    {
      path     : '/groups',
      name     : 'Groups',
      component: Groups
    }
  ]
})
