<template>
  <div v-if="loaded" class="content">
    <v-toolbar flat color="white">
      <v-toolbar-title>LDAP</v-toolbar-title>
      <v-spacer/>
      <v-btn color="primary" dark @click="onAddClick()">Ajouter</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.cn }}</td>
        <td class="text-xs-right">{{ props.item.givenName }}</td>
        <td class="text-xs-right">{{ props.item.mail }}</td>
        <td class="text-xs-right">{{ props.item.homeDirectory }}</td>
        <td class="text-xs-right">{{ props.item.loginShell }}</td>
        <td class="text-xs-right">{{ props.item.age }}</td>
        <td class="text-xs-right">{{ props.item.games }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="onUpdateClick(props.item)">edit</v-icon>
          <v-icon small @click="onDeleteClick(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="console.log('reset')">Reset</v-btn>
      </template>
    </v-data-table>
    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this user ?</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="darken-1" flat="flat" @click="deleteDialog = false">Disagree</v-btn>
            <v-btn color="red darken-1" flat="flat" @click="onDeleteConfirm">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <add-dialog 
      v-if="userDialog"
      :editable-user="selectedUser"
      @close="onUserDialogClose" 
      @add="onAddConfirm" 
      @update="onUpdateConfirm"/>
  </div>

  <div v-else>LOADING</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AddDialog from '@/components/AddDialog'

  export default {
    name: 'Users',
    components:  { AddDialog },
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
      userDialog   : false,
      selectedUser: null
    }),

    computed: {
      ...mapGetters({
        users: 'ldapUsers/users'
      })
    },

    created () {
      this.init()
    },

    methods: {
      ...mapActions({
        fetchUsers: 'ldapUsers/fetchUsers',
        addUser   : 'ldapUsers/addUser',
        updateUser: 'ldapUsers/updateUser',
        deleteUser: 'ldapUsers/deleteUser'
      }),

      async init () {
        this.loaded = false
        await this.fetchUsers()
        this.loaded = true
      },

      onAddClick () {
        this.userDialog = true
      },

      async onAddConfirm (user) {
        this.userDialog = false
        await this.addUser(user)
        this.selectedUser = null
        this.init()
      },

      onUpdateClick (user) {
        this.selectedUser = user
        this.userDialog   = true
      },

      async onUpdateConfirm (user) {
        this.userDialog = false
        await this.updateUser(user)
        this.selectedUser = null
        this.init()
      },

      onDeleteClick (user) {
        this.selectedUser = user
        this.deleteDialog = true
      },

      async onDeleteConfirm () {
        this.deleteDialog = false
        await this.deleteUser(this.selectedUser.dn)
        this.selectedUser = null
        this.init()
      },

      onUserDialogClose () {
        this.userDialog = false
        this.selectedUser = null
      }
    }
  }
</script>

<style scoped>

</style>
