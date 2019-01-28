<template>
  <div class="add">
    <v-btn flat @click="addUser">AJOUTER</v-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name   : 'AddUser',
    methods: {
      ...mapActions({
        addUser: 'ldapStore/addUser'
      })
    }
  }
</script>

<style scoped>

</style>
