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
        if(this.$store.getters.loadLoginState){
          this.$router.push('/main');
          return;
        }
        else{
          if(this.$cookie.get('BOOKSUID')){
            this.$router.push('/main')
            return;
          }
        }
        this.$router.push('/login')
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
