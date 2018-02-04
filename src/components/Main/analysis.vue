<template>
  <v-container fluid class='pt-2 pb-1 px-0'>
    <v-layout row wrap justify-center>
      <v-flex lg7 md9 sm11 xs12>
        <v-card>
          <v-container class='px-1 py-1'>
            <v-layout row wrap justify-center>
              <v-flex lg7 md9 sm11 xs11>
                <v-card-title>
                  <strong class='title'>Individule Expense distribution</strong>
                </v-card-title>
              </v-flex>

              <v-flex lg8 md10 sm11 xs12>
                <v-card-media>
                    <vue-chart type="bar" :data="expenseData" :options="myOption"></vue-chart>
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout >
      <v-container class='pa-1'>
      </v-container>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex lg7 md9 sm11 xs12>
        <v-card>
          <v-container class='px-1 py-1'>
            <v-layout justify-center>
              <v-flex lg7 md9 sm11 xs11>
                <v-card-title>
                  <strong class='title'>Roommates Expense Contribution</strong>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-flex lg5 md7 sm8 xs10>
                <v-card-media>
                  <vue-chart type="doughnut" :data="contributeData" :options="myOption" :width="pieWidth" :height="pieHeight"></vue-chart>
                </v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
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
        pieHeight: 10,
        pieWidth: 10,
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
              fontSize: 11,
              fontStyle:'bold',
            }
          }
        },
        backgroundColor: [
          '#ff4d4d',
          '#4d94ff',
          '#00D8FF',
          '#41B883',
          '#f49542',
          '#8824c1',
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
            vm.contributeData.datasets[0].data.push((details[idx].total/100).toFixed(2));
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
            newItem.data = [(dist[idx].amount/100).toFixed(2), 0];
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
