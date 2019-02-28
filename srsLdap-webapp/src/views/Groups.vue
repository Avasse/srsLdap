<template>
  <div v-if="loaded" class="content">
    <v-toolbar flat color="white">
      <v-toolbar-title>LDAP</v-toolbar-title>
      <v-spacer/>
      <v-btn color="primary" dark @click="onAddClick()">Ajouter</v-btn>
      <v-btn color="primary" dark @click="onExportClick()">Exporter</v-btn>
      <div class="import">
        <v-btn color="primary" type="file" @click="$refs.inputUpload.click()">Importer</v-btn>
        <input 
          v-show="false" 
          ref="inputUpload" 
          type="file" 
          @change="onImportClick">
      </div>
    </v-toolbar>
    <v-data-table :headers="headers" :items="groups" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.cn }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.memberUid }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="onUpdateClick(props.item)">edit</v-icon>
          <v-icon small @click="onDeleteClick(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="init()">Reset</v-btn>
      </template>
    </v-data-table>
    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this group ?</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="darken-1" flat="flat" @click="deleteDialog = false">Disagree</v-btn>
            <v-btn color="red darken-1" flat="flat" @click="onDeleteConfirm">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <groups-dialog
      v-if="groupDialog"
      :editable-group="selectedGroup"
      @close="onGroupDialogClose"
      @add="onAddConfirm"
      @update="onUpdateConfirm"/>
  </div>

  <div v-else>LOADING</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import GroupsDialog               from '@/components/groups/GroupsDialog'
  import { saveAs } from 'file-saver';

  export default {
    name: 'Groups',    
    components: { GroupsDialog },
    data: () => ({
      loaded : false,
      headers: [
        { text: 'Common name', value: 'cn', sortable: true },
        { text: 'Description', value: 'description', sortable: true },
        { text: 'Users', value: 'memberUid' },
      ],
      deleteDialog: false,
      groupDialog  : false,
      selectedGroup: null
    }),

    computed: {
      ...mapGetters({
        groups: 'ldapGroups/groups'
      })
    },

    created () {
      if (!this.isAdmin) this.$router.push({name: "Login"})
      this.init()
    },

    methods: {
      ...mapActions({
        fetchGroups: 'ldapGroups/fetchGroups',
        addGroup   : 'ldapGroups/addGroup',
        updateGroup: 'ldapGroups/updateGroup',
        deleteGroup: 'ldapGroups/deleteGroup',
        isAdmin    : 'user/isAdmin',
        isLoggedIn : 'user/isLoggedIn'
      }),

      async init () {
        this.loaded = false
        await this.fetchGroups()
        this.loaded = true
      },

      onAddClick () {
        this.groupDialog = true
      },

      async onAddConfirm (group) {
        this.groupDialog = false
        await this.addGroup(group)
        this.selectedGroup = null
        this.init()
      },

      onUpdateClick (group) {
        this.selectedGroup = group
        this.groupDialog   = true
      },

      async onUpdateConfirm (group) {
        this.groupDialog = false
        await this.updateGroup(group)
        this.selectedGroup = null
        this.init()
      },

      onDeleteClick (group) {
        this.selectedGroup = group
        this.deleteDialog = true
      },

      async onDeleteConfirm () {
        this.deleteDialog = false
        await this.deleteGroup(this.selectedGroup.dn)
        this.selectedGroup = null
        this.init()
      },

      onGroupDialogClose () {
        this.groupDialog   = false
        this.selectedGroup = null
      },

      onExportClick () {
        let blob = new Blob([JSON.stringify(this.groups)], {type:"application/json;charset=utf-8"});
        saveAs(blob, "groups.json");
      },

      async onImportClick (event) {
        let reader = new FileReader();
        reader.readAsText(event.target.files[0], 'UTF-8');
        reader.onload = async (evt) => {
          let groups = JSON.parse(evt.target.result)
          this.loaded = false
          await Promise.all(groups.map(async (group) => await this.addGroup(group)));
          this.init()
        }
      }
    }
  }
</script>

<style scoped>

</style>
