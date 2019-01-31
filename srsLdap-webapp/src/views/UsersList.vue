<template>
  <v-data-table
    v-if="loaded"
    :headers="headers"
    :items="users"
    class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
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
        {
          text    : 'Dessert (100g serving)',
          align   : 'left',
          sortable: false,
          value   : 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'name', sortable: false }
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
      console.log('toto')
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
