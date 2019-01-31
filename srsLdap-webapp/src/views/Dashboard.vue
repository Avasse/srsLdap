<template>
  <v-data-table
    v-if="loaded"
    :headers="headers"
    :items="users"
    class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.cn }}</td>
      <td class="text-xs-right">{{ props.item.givenName }}</td>
      <td class="text-xs-right">{{ props.item.mail }}</td>
      <td class="text-xs-right">{{ props.item.homeDirectory }}</td>
      <td class="text-xs-right">{{ props.item.loginShell }}</td>
      <td class="text-xs-right">{{ props.item.age }}</td>
      <td class="text-xs-right">{{ props.item.games }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="$emit('edit', props.item.uid)">edit</v-icon>
        <v-icon small @click="onDeleteClick(props.item.dn)">delete</v-icon>
      </td>
    </template>
    <template slot="no-data">
      <v-btn color="primary" @click="console.log('reset')">Reset</v-btn>
    </template>
  </v-data-table>

  <v-dialog v-else-if="loaded && dialogDelete" max-width="290">
    <v-card>
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this user ?</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="green darken-1" flat="flat" @click="deleteDialog = false">Disagree</v-btn>
        <v-btn color="red darken-1" flat="flat" @click="onDeleteConfirm">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div v-else-if="!loaded">LOADING</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    data: () => ({
      headers: [
        { text: 'Name', value: 'cn' },
        { text: 'Pseudo', value: 'givenName' },
        { text: 'Mail', value: 'mail', sortable: false },
        { text: 'HomeDir', value: 'homeDirectory', sortable: false },
        { text: 'LoginShell', value: 'loginShell', sortable: false },
        { text: 'Age', value: 'age' },
        { text: 'Games', value: 'games' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],

      loaded      : false,
      deleteDialog: false,
      selectedDN  : null
    }),

    computed: {
      ...mapGetters({
        users: 'ldap/users'
      })
    },

    created () {
      this.init()
    },

    methods: {
      ...mapActions({
        fetchUsers: 'ldap/fetchUsers',
        deleteUser: 'ldap/deleteUser'
      }),

      async init () {
        this.loaded = false
        await this.fetchUsers()
        this.loaded = true
      },

      onDeleteClick (dn) {
        this.selectedDn   = dn
        this.deleteDialog = true
      },

      async onDeleteConfirm () {
        this.deleteUser(this.selectedDN)
        this.selectedDn = null
      }
    }
  }
</script>

<style scoped>

</style>
