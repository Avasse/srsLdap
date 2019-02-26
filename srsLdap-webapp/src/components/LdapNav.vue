<template>
  <v-toolbar app>
    <v-toolbar-side-icon/>
    <v-toolbar-title>My Fkin LDAP</v-toolbar-title>
    <v-spacer/>
    <v-spacer/>
    <v-toolbar-items v-if="isUsersView" class="hidden-sm-and-down">
      <v-btn flat @click="goToGroups()">Groupes</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="isGroupsView" class="hidden-sm-and-down">
      <v-btn flat @click="goToUsers()">Users</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'LdapNav',
    computed: {
      isUsersView () {
        return this.$route.name === "Users"
      },

      isGroupsView () {
        return this.$route.name === "Groups"
      }
    },

    methods: {
      goToGroups () {
        this.$router.push({name: 'Groups'})
      },

      goToUsers () {
        this.$router.push({name: 'Users'})
      }
    },
  }
</script>

<style scoped>

</style>
