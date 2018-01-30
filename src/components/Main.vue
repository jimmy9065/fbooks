<template>
  <v-container >
    <v-navigation-drawer class = "hidden-md-and-up" fixed temporary>
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

    <v-container fluid extend>
      <v-layout >
        <v-flex >
          <v-toolbar class="hidden-sm-and-down" extend>
            <v-toolbar-title>
              <h3>{{banner}}</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items
              v-for="item in menuItems" 
              :key="item.title"
              >
              <v-btn :to="item.link" flat @click.native="">
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
        </v-flex>
      </v-layout >

      <v-layout >
        <v-flex>
          <router-view></router-view>
        </v-flex>
      </v-layout>
  </v-container>

  </v-container>
  
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'account_balance', title:'Quick view', link: '/main'},
          {icon: 'receipt', title:' History ', link: '/main/history'},
          {icon: 'assessment', title:' Analysis ', link: '/main/analysis'},
        ],
      }
    },
    methods: {
      logout() {
        console.log('try to logout')
        this.$store.dispatch('submitLogout').then(() => {
          console.log('logout state changed successfully');
          this.$cookie.delete('BOOKSUID');
          this.$router.push('/login');
        })
      }
    },
    computed: {
      banner: function(){
        return "Welcome    " + this.$store.getters.getUsername;
      }
    }
  }
</script>
