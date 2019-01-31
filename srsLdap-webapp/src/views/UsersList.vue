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
        <v-icon small class="mr-2" @click="console.log('edit')">edit</v-icon>
        <v-icon small @click="console.log('delete')">delete</v-icon>
      </td>
    </template>
    <template slot="no-data">
      <v-btn color="primary" @click="console.log('reset')">Reset</v-btn>
    </template>
  </v-data-table>
  <div v-else>LOADING</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'UsersList',
    data: () => ({
      dialog : false,
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

      loaded: false
    }),

    computed: {
      ...mapGetters({
        users: 'ldap/users'
      })
    },

    async created () {
      await this.fetchUsers()
      this.loaded = true
    },

    methods: {
      ...mapActions({
        fetchUsers: 'ldap/fetchUsers'
      })

      // editItem (item) {
      // },

      // deleteItem (item) {
      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?')
      // },

      // close () {
      //   this.dialog = false
      //   setTimeout(() => {
      //     this.editedItem  = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   }, 300)
      // }
    }

  }
</script>

<style scoped>

</style>
