<template>
  <v-toolbar app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>My Fkin LDAP</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'add'}">Ajouter</v-btn>
      <v-btn flat :to="{name: 'update'}">Modifier</v-btn>
      <v-btn flat>Supprimer</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'ldapNav'
  }
</script>

<style scoped>

</style>
