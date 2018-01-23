<template id="login">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="iusername"
                    prepend-icon="person"
                    label="User Name"
                    id="username"
                    v-model="username"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="ipassword"
                    label="Password"
                    id="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="primary" dark @click.stop="">Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-text>
                <v-spacer></v-spacer>
              </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
