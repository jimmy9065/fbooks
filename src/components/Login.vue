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
                  label="Enter your username"
                  v-model="username"
                  v-on:click = "clearState"
                  v-on:keyup.enter = "sendAuth"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="ipassword"
                  label="Enter your password"
                  hint="At least 8 characters"
                  v-model="password"
                  v-on:click = "clearState"
                  v-on:keyup.enter = "sendAuth"
                  :append-icon="visable ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visable = !visable)"
                  :type="visable ? 'password' : 'text'"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="primary" dark @click.stop="sendAuth()">Login</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-card-text>
              <v-spacer></v-spacer>
            </v-card-text>
            <v-alert color="error" icon="warning" v-model="conAlert" transition="scale-transition">
              No connection.
            </v-alert>
            <v-alert color="error" icon="warning" v-model="noMatchAlert" transition="scale-transition">
              Username and Password are not match.
            </v-alert>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        loginState: false,
        conAlert: false,
        noMatchAlert: false,
        visable: true
      }
    },
    methods: {
      sendAuth(){
        let CryptoJS = require('crypto-js');
        let base64url = require('base64url');
        let encrypt = CryptoJS.AES.encrypt(this.password, 'abcd').toString(CryptoJS.enc.hex);
        let encoded = base64url.encode(encrypt);

        console.log('send password')
        this.$http.get('http://jimmy9065.ddns.net:8081/api/login',
                        {params: {username:this.username, password:encoded}})
        .then(response => {
          console.log('password is correct');
          console.log(this.username);
          console.log(response.body);
          this.$store.dispatch('submitLogin',
            {pass: response.body.pass, username: this.username})
            .then(()=>{
              console.log('get here');
              this.$cookie.set('BOOKSUID', response.body.cookie, 1);
              this.$router.push({path:'/main'});
            })
            .catch(() => {
              console.log('wrong password: ' + this.password);
              this.password = '';
              this.noMatchAlert = true;
            })
        })
        .catch(() => {
          console.log('password failed to submit');
          this.conAlert = true;
        });
      },
      clearState() {
        if(this.noMatchAlert){
          console.log('hit')
          this.noMatchAlert = false;
        }
      }
    },
  }
</script>
