<template>
  <v-container fill-height class='pt-0'>
    <v-layout row wrap justify-center>
      <v-flex xs8 class='pa-0'>
            <v-progress-linear v-bind:indeterminate="true" v-bind:active="!HdataLoaded">
            </v-progress-linear>
      </v-flex>

      <v-flex xs8 class='pb-4'>
        <v-card>
          <v-card-title >
            <v-container class='pa-0'>
              <v-layout justify-center>
                <h2>Individule Expense distribution</h2>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-media height="250px">
            <v-container>
              <vue-chart type="bar" :data="chartData"></vue-chart>
            </v-container>
          </v-card-media>
          <v-card-text>
            <v-container>
            </v-container>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs8 class='bt-4'>
        <v-card>
          <v-card-title >
            <v-container class='pa-0'>
              <v-layout justify-center>
                <h2>Roommates Expense Distribution</h2>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-media height="250px">
            <v-container>

            </v-container>
          </v-card-media>
          <v-card-text>
            <v-container>
            </v-container>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    created(){
      console.log("loading data");
      this.updateDataTable();
    },
    data () {
      return {
        chartData: {
          label: ['item1','item2','item3',],
          datasets: [
            {
              label: 'Component 1',
              data:[10,20,30]
            },
            {
              label: 'Component 2',
              data:[40,20,30]
            },
          ]
        }
      }
    },
    methods: {
     updateDataTable() {
        console.log("update HdataTable")
        this.$store.dispatch("aUpdateHDT");

        let vm = this;
        setTimeout(function(){
          vm.$store.dispatch("aFinishHDT");
        }, 1500);
      },
    },
    computed: {
      HdataLoaded: function(){
        return this.$store.getters.isHLoaded;
      }
    }
  }
</script>
