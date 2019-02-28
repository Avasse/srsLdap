<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Groups</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex v-if="!isEdit" xs12>
              <v-text-field v-model="group.cn" label="Common Name*" required/>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="group.description" label="Description*" required/>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="group.memberUid"
                :items="users"
                name="memberUid"
                multiple
                label="Users*"
                item-text="uid"
                required/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" flat @click="$emit('close')">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="onSave()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"

  export default {
    name: 'GroupsDialog',

    props: {
      editableGroup: {
        type: Object,
        default: () => {}
      },
    },

    data () {
      return {
        loaded : false,
        dialog: true,
        group  : {
          cn         : null,
          description: null,
          memberUid : null,
        }
      }
    },

    computed: {
      ...mapGetters({
        users: 'ldapUsers/users' 
      }),

      isEdit () {
      return this.editableGroup && Object.keys(this.editableGroup).length > 0
      }
    },

    async created () {
      await this.init()
    },

    methods: {
      ...mapActions({
        fetchUsers: 'ldapUsers/fetchUsers'
      }),

      async init () {
        await this.fetchUsers()
        if (this.isEdit) this.group = JSON.parse(JSON.stringify(this.editableGroup))
        this.loaded = true
      },

      onSave () {
        if (this.isEdit) this.$emit('update', this.group)
        else this.$emit('add', this.group)
      }
    },
  }
</script>

<style scoped>

</style>
