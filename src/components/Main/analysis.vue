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
          <v-card-media height="290px">
            <v-container>
              <vue-chart type="bar" :data="expenseData" :options="myOption"></vue-chart>
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
                <h2>Roommates Expense Contribution</h2>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-media height="290px">
            <v-container>
              <vue-chart type="doughnut" :data="contributeData" :options="myOption"></vue-chart>
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
      this.updateGraph();
    },
    data () {
      return {
        expenseData: {
          datasets: [],
        },
        contributeData: {
          labels: [],
          datasets: [
            {
              data:[],
              backgroundColor: [
                '#ff4d4d',
                '#4d94ff',
                '#00D8FF',
                '#41B883',
              ],
            },
          ],
        },
        myOption: {
          legend: {
            labels: {
              fontColor: '#47476b',
              fontSize: 15,
              fontStyle:'bold',
            }
          }
        },
        backgroundColor: [
          '#ff4d4d',
          '#4d94ff',
          '#00D8FF',
          '#41B883',
        ],
      }
    },
    methods: {
      updateGraph() {
        console.log("update HdataTable")
        this.$store.dispatch("aUpdateHDT");

        let vm = this;
        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/due',
          {credentials:true})
        .then(response => {
          console.log('Updated graph')
          console.log('response body:')
          console.log(response.body)
          console.log(response.body.details);
          let details = response.body.details;
          vm.contributeData.labels = [];
          vm.contributeData.datasets[0].data = [];
          for(let idx in details){
            vm.contributeData.labels.push(details[idx]._id);
            vm.contributeData.datasets[0].data.push(details[idx].total/100);
          }
          console.log(vm.contributeData.datasets)
        }, response => {
          console.log('Faild to update graph')
          vm.$store.dispatch("aFinishHDT");
          return;
        })

        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/dist',
          {credentials:true})
        .then(response => {
          console.log('data:')
          console.log(response.body.data);
          let dist = response.body.data;
          vm.expenseData.datasets = [];
          for(let idx in dist){
            let newItem = {};
            newItem.label = dist[idx]._id;
            newItem.data = [dist[idx].amount, 0];
            newItem.backgroundColor = this.backgroundColor[idx];
            vm.expenseData.datasets.push(newItem);
          }
          console.log(vm.contributeData.datasets)
        }, response => {
          console.log('Faild to update graph')
          vm.$store.dispatch("aFinishHDT");
          return;
        })

        console.log("Updated the grpah");
        this.$store.dispatch("aFinishHDT");
      },
    },
    computed: {
      HdataLoaded: function(){
        return this.$store.getters.isHLoaded;
      }
    }
  }
</script>
