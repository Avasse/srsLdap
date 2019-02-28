<template>
  <v-toolbar app>
    <v-toolbar-side-icon/>
    <v-toolbar-title>My Fkin LDAP</v-toolbar-title>
    <v-spacer/>
    <v-spacer/>
    <v-toolbar-items v-if="isNotGroupsView && isAdmin" class="hidden-sm-and-down">
      <v-btn flat @click="goToGroups()">Groupes</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="isNotUsersView && isLoggedIn" class="hidden-sm-and-down">
      <v-btn flat @click="goToUsers()">Users</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
      <v-btn flat @click="goToLogin()">Login</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="isLoggedIn" class="hidden-sm-and-down">
      <v-btn flat @click="onLogout()">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: 'LdapNav',
    computed: {
      ...mapGetters({
        isAdmin   : 'user/isAdmin',
        isLoggedIn: 'user/isLoggedIn'
      }),

      isNotUsersView () {
        return this.$route.name !== "Users"
      },

      isNotGroupsView () {
        return this.$route.name !== "Groups"
      }
    },

    methods: {
      ...mapActions({
        logout: 'user/logout'
      }),

      goToGroups () {
        if (this.isAdmin) this.$router.push({name: 'Groups'})
      },

      goToUsers () {
        if (this.isLoggedIn) this.$router.push({name: 'Users'})
      },

      goToLogin () {
        this.$router.push({name: 'Login'})
      },

      async onLogout () {
        await this.logout()
        this.$router.push({name: 'Login'})
      }
    },
  }
</script>

<style scoped>

</style>
