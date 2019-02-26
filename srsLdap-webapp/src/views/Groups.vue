<template>
  <div v-if="loaded" class="content">
    <v-toolbar flat color="white">
      <v-toolbar-title>LDAP</v-toolbar-title>
      <v-spacer/>
      <v-btn color="primary" dark @click="console.log('add')">Ajouter</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="groups" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="console.log('update')">edit</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="init()">Reset</v-btn>
      </template>
    </v-data-table>
  </div>

  <div v-else>LOADING</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Groups',
    data: () => ({
      loaded : false,
      headers: [
        { text: 'Description', value: 'description', sortable: true }
      ]
    }),

    computed: {
      ...mapGetters({
        groups: 'ldapGroups/groups'
      })
    },

    created () {
      this.init()
    },

    methods: {
      ...mapActions({
        fetchGroups: 'ldapGroups/fetchGroups'
      }),

      async init () {
        this.loaded = false
        await this.fetchGroups()
        this.loaded = true
      }
    }
  }
</script>

<style scoped>

</style>
