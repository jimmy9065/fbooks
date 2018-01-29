<template>
  <v-app>
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
        loginDialog: true
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
      }
    }
  }
</script>
