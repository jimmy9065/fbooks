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
      {{ swipeDirection }}
    </v-navigation-drawer>

    <v-toolbar class="hidden-sm-and-down" extend 
      v-if="this.$store.getters.loadLoginState">
      <v-toolbar-title>
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
          <v-icon left>supervisor_account</v-icon>
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
      this.checkLogin()
      document.title = 'Roommates Finance Book'
      console.log("starting")
    },
    data () {
      return {
        swipeDirection: 'left',
        //swipe: false,
        menuItems: [
          {icon: 'account_balance', title:'Quick view', link: '/main'},
          {icon: 'receipt', title:' History ', link: '/main/history'},
          {icon: 'assessment', title:' Analysis ', link: '/main/analysis'},
        ],
      }
    },
    watch:{
      "$route" : 'checkLogin'
    },
    methods:{
      checkLogin(){
        if(!this.$store.getters.loadLoginState){
          if(this.$cookie.get('BOOKSUID')){
            let cookie = this.$cookie.get('BOOKSUID');
            if(/[a-zA-Z0-9]+@[a-zA-Z0-9\+\/]+/i.test(cookie)){ 
              let user = /([a-zA-Z0-9]+)@/.exec(cookie)[1]
              this.$store.dispatch('submitLogin', {pass: true, username: user})
              console.log('username in cookid: ' + user)
              let currentPath = this.$store.state.route.path
              if(currentPath == '/' || currentPath == '/login')
                this.$router.push('/login')
              return;
            }
            else{
              this.$cookie.delete('BOOKSUID');
            }
          }
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
          this.$cookie.delete('BOOKSUID');
          this.$router.push('/login');
        })
      },
    },
    computed: {
      banner: function(){
        return "Welcome    " + this.$store.getters.getUsername;
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
