<template>
  <v-app>
    <ldap-nav @addUser="dialog = 1"/>
    <v-content>
      <v-container fill-height justify-center>
        <dashboard/>
        <add-dialog v-if="dialog === 1" @close="dialog = NO_DIALOG" @add="onAddUser"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import AddDialog      from './components/AddDialog'
  import LdapNav        from './components/LdapNav'
  import Dashboard      from './views/Dashboard'

  const NO_DIALOG   = 0
  const ADD_DIALOG  = 1
  const EDIT_DIALOG = 2

  export default {
    name      : 'App',
    components: { AddDialog, Dashboard, LdapNav },
    data () {
      return {
        dialog: NO_DIALOG
      }
    },

    methods: {
      ...mapActions({
        addUser: 'ldap/addUser'
      }),

      onAddUser (user) {
        this.addUser(user)
      }
    }
  }
</script>
