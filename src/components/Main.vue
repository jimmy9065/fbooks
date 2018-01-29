<template id="user">
  <v-content>
  <h3>This is User</h3>
    <router-view></router-view>
    <router-link to="/main/analysis">/user/foo</router-link>
    <router-link to="/main/history">/user/foo</router-link>
  </v-content>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
