<template>
  <v-app>
    <v-navigation-drawer class = "hidden-md-and-up"
      fixed temporary v-model="swipe"
      v-if="this.$store.getters.loadLoginState">
      <v-toolbar flat>
        <v-list>
          <v-list-tile class="title">
            {{banner}}
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link"
          @click="" >
          <v-list-tile-action>
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-tile-action>  
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="hidden-sm-and-down" extend 
      v-if="this.$store.getters.loadLoginState">
      <v-toolbar-title class="hidden-sm-and-down">
        <h3>{{banner}}</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-for="item in menuItems" 
        :key="item.title"
        >
        <v-btn :to="item.link" flat exact @click.native="">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn flat @click="logout">
          <v-icon left>directions_run</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    created(){
      document.title = 'Roommates Finance Book';
      console.log("*****************starting********************");
      if(this.$cookie.get('BOOKSUID')){
        console.log('found cookie');
        this.$http.get(this.$store.state.backendServer + ':8081/api/login/check',
                        {credentials:true, timeout: 1000})
        .then(response => {
          if(response.ok){
            console.log('cookie is correct');
            console.log(response.body.username);
            this.$store.dispatch('submitLogin', response.body)
            .then(() => {
              this.$router.push({path:'/main'});
            });
          }
          else{
            console.log('cookie is not valid')
            this.$cookie.delete('BOOKSUID', {domain: '.jimmy9065.ddns.net'});
            this.checkLogin();
          }
        })
        .catch(() => {
          console.log('check cookie failed');
          this.$cookie.delete('BOOKSUID', {domain: '.jimmy9065.ddns.net'});
          this.checkLogin();
          this.conAlert = true;
        })
      }
      else
        this.checkLogin();
    },
    data () {
      return {
        swipeDirection: 'left',
        //swipe: false,
        menuItems: [
          {icon: 'home', title:'Quick view', link: '/main'},
          {icon: 'account_balance', title:' History ', link: '/history'},
          {icon: 'equalizer', title:' Analysis ', link: '/analysis'},
        ],
      }
    },
    methods:{
      checkLogin(){
        if(!this.$store.getters.loadLoginState){
          this.$router.push('/login')
        }
        else{
          let currentPath = this.$store.state.route.path
          if(currentPath == '/' || currentPath == '/login')
            this.$router.push('/main')
        }
      },
      getCookie(){
        var cookieName = 'fbooks'
        var matcher = new RegExp(cookieName + 'id\\.[0-9a-zA-Z]+=([0-9a-zA-Z]+);?')
        var match = document.cookie.match(matcher);
        if(match && match[1])
          //check with server or it will return false(even if it's no response
          return true;
        else
          return false;
      },
      logout() {
        console.log('try to logout')
        this.$store.dispatch('submitLogout').then(() => {
          console.log('logout state changed successfully');
          this.$cookie.delete('BOOKSUID', {domain: '.jimmy9065.ddns.net'});
          this.$router.push('/login');
        })
      },
    },
    computed: {
      banner: function(){
        return "Welcome " + this.$store.getters.getUsername;
      },
      isShow: function() {
        return this.$store.getters.loadLoginState;
      },
      swipe: function() {
        if(this.swipeDirection =='right')
         return true;
        if(this.swipeDirection == 'left')
         return false;
        else
          return swipe;
      },
    }
  }
</script>
