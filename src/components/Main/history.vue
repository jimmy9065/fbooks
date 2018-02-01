<template>
  <v-container fill-height >
    <v-layout column wrap justify-center>
      <v-flex>
        <v-card column >
            <v-progress-linear v-bind:indeterminate="true" v-bind:active="!HdataLoaded">
            </v-progress-linear>

            <v-container class="pa-0" >
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.date }}</td>
                <td class="text-xs-center">{{ props.item.description }}</td>
                <td class="text-xs-center">{{ props.item.category }}</td>
                <td class="text-xs-center">{{ props.item.owner }}</td>
                <td class="text-xs-center">{{ (props.item.amount/100).toFixed(2) }}</td>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
            </v-data-table>
              <v-footer class="pa-4" color="gray">
                <v-tooltip bottom>
                  <v-btn 
                    icon 
                    slot="activator" 
                    @click="this.updateDataTable" 
                    color="blue"
                    v-bind:loading="!HdataLoaded"
                    dark
                    >
                    <v-icon>cached</v-icon>
                  </v-btn>
                  <span>Refresh</span>
                </v-tooltip>
              </v-footer>
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
      this.updateDataTable();
    },
    data () {
      return {
        headers: [
          {align: 'center', text: 'Date', sortable:false, value: 'date'},
          {align: 'center', text: 'Title', sortable: false, value: 'description'},
          {align: 'center', text: 'Category', sortable: false, value: 'category'},
          {align: 'center',text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', sortable:false, value: 'amount'},
        ],
        items : [
          {}
        ],
      }
    },
    methods: {
      updateDataTable() {
        console.log("update HdataTable")
        this.$store.dispatch("aUpdateHDT");

        let vm = this;
        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/allTrans',
          {credentials:true})
          .then(response =>{
            console.log('get HData')
            vm.$store.dispatch("aFinishHDT");

            this.items = []
            for(let idx in response.body){
              response.body[idx].date = response.body[idx].date.match(/([0-9\-]+)T/)[1]
              this.items.push(response.body[idx]);
            }

          }, response => {
            console.log('no connection');
            vm.$store.dispatch("aFinishHDT");
          })
      },
    },
    computed: {
      HdataLoaded: function(){
        return this.$store.getters.isHLoaded;
      }
    }
  }
</script>
