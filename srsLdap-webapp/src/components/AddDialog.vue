<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add User</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.sn" label="Surname*" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.givenName" label="Given Name" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.cn" label="Common Name*" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.uid" label="Uid*" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.pseudo" label="Pseudo*" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="user.age"
                label="Age*"
                type="number"
                required/>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="user.mail" label="Email*" required/>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="user.userPassword"
                label="Password*"
                type="password"
                required/>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.homeDirectory" label="Home directory*" required/>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.loginShell" label="Login Shell*" required/>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                v-model="user.games"
                :items="games"
                multiple
                label="Games*"
                required/>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="user.steamAccount" label="Steam Account*" required/>
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
  export default {
    name: 'AddDialog',

    props: {
      editableUser: {
        type: Object,
        default: () => {}
      },
    },

    data () {
      return {
        dialog: true,
        user  : {
          sn           : null,
          givenName    : null,
          cn           : null,
          uid          : null,
          pseudo       : null,
          mail         : null,
          userPassword : null,
          homeDirectory: null,
          loginShell   : null,
          age          : null,
          games        : null,
          steamAccount : null
        },

        games: ['WoW', 'FFXIV', 'Rocket League']
      }
    },

    created () {
      if (this.editableUser && Object.keys(this.editableUser).length !== 0) this.user = JSON.parse(JSON.stringify(this.editableUser))
    },

    methods: {
      onSave () {
        if (this.editableUser && Object.keys(this.editableUser).length !== 0) this.$emit('update', this.user)
        else this.$emit('add', this.user)
      }
    },
  }
</script>

<style scoped>

</style>
