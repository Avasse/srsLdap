<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar dark color="primary">
						<v-toolbar-title>Login form</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-text-field 
								v-model="user.login"
								prepend-icon="person" 
								name="login" 
								label="Login" 
								type="text"/>
							<v-text-field 
								v-model="user.password"
								id="password" 
								prepend-icon="lock" 
								name="password" 
								label="Password" 
								type="password"/>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer/>
						<v-btn color="primary" @click="onLogin">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
    </v-layout>
	</v-container>
</template>

<script>
	import { mapActions } from "vuex"

  export default {
		name: 'Login',
		data () {
			return {
				user: {
					login: null,
					password: null
				}
			}
		},

		methods: {
			...mapActions({
				login : 'user/login'
			}),

			async onLogin () {
				await this.login(this.user)
				this.$router.push({name: "Users"})
			}
		},
  }
</script>

<style scoped>

</style>
