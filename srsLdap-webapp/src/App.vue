<template>
  <v-app>
    <ldap-nav/>
    <v-content>
      <v-container fill-height justify-center>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import LdapNav from './components/ldapNav'

  export default {
    name      : 'App',
    components: { LdapNav }
  }
</script>
