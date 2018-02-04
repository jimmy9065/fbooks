<template>
  <p>This page is not supposed to be shown</p>
</template>


<script>
  export default {
    created: function(){
      console.log('===========here==============')
      if(!this.$store.getters.loadLoginState){
        console.log('push to login')
        this.$router.push('/login')
      }
      else{
        console.log('push to main')
        this.$router.push('/main')
      }
    },
  }
<script>
