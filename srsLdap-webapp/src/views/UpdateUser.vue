<template>
  <div class="update">
    <v-btn flat @click="updateUser">UPDATE</v-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name   : 'Update',
    methods: {
      ...mapActions({
        updateUser: 'ldap/updateUser'
      })
    }
  }
</script>

<style scoped>

</style>
