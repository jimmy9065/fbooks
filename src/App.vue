<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    created(){
      //this.checkLogin()
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
        if(!this.getCookie('mySession'))
          this.$router.push('/login')
        else
          this.$router.push('/user')
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
