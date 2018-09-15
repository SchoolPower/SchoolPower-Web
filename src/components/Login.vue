<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>SchoolPower Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="err" :value="true" type="error" class="mb-3">
                  {{err['description']}}
                </v-alert>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username"
                                name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="password"
                                name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="pr-4 pb-4">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      err: null,
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('os', 'web');
      formData.append('version', '1.0.0');
      formData.append('action', 'login');
      fetch('https://api.schoolpower.tech/api/2.0/get_data.php',
        {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then((json) => {
          if (json.err) {
            this.err = json;
            return;
          }

          localStorage.information = JSON.stringify(json.information);
          localStorage.subjects = JSON.stringify(json.sections);
          localStorage.attendances = JSON.stringify(json.attendances);
          localStorage.additional = JSON.stringify(json.additional);
          this.$cookie.set('username', this.username, { expires: '1Y' });
          this.$cookie.set('password', this.password, { expires: '1Y' });
          this.$router.push('/');
        });

    },
  },
};
</script>

<style scoped>

</style>
