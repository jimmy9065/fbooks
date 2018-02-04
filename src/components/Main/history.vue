<template>
  <v-container fluid class='pt-2 pb-1 px-0'>
    <v-layout row wrap justify-center>
      <v-flex lg8 md9 sm9 xs12>
        <v-card>
          <v-container fluid class="pt-1 pb-5 px-0">
            <v-layout row wrap justify-center>
              <v-flex lg12 md12 sm12 xs12>
                <v-card-title class="pt-1 pb-1">
                <strong>Expenses:</strong>
                </v-card-title>
              </v-flex>

              <v-flex lg12 md12 sm12 xs12>
                <v-data-table
                  id='expenseDT'
                  v-bind:headers="expenseHeaders"
                  v-bind:items="expenses"
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
              </v-flex>

              <v-flex lg12 md12 sm12 xs12>
                <v-card-title class="pt-1 pb-1" color="gray">
                <strong>Payments:</strong>
                </v-card-title>
              </v-flex>

              <v-flex lg12 md12 sm12 xs12>
                <v-data-table
                  id='paymentDT'
                  v-bind:headers="paymentHeaders"
                  v-bind:items="payments"
                  class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.date }}</td>
                    <td class="text-xs-center">{{ props.item.owner }}</td>
                    <td class="text-xs-center">{{ -(props.item.amount/100).toFixed(2) }}</td>
                  </template>
                  <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                      Sorry, nothing to display here :(
                    </v-alert>
                  </template>
                </v-data-table>
              </v-flex>

              <v-flex lg12 md12 sm12 xs12>
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
                <v-divider></v-divider>
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
      this.updateDataTable();
    },
    data () {
      return {
        expenseHeaders: [
          {align: 'center', text: 'Date', sortable:false, value: 'date'},
          {align: 'center', text: 'Title', sortable: false, value: 'description'},
          {align: 'center', text: 'Category', sortable: false, value: 'category'},
          {align: 'center',text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', sortable:false, value: 'amount'},
        ],
        paymentHeaders: [
          {align: 'center', text: 'Date', sortable:false, value: 'date'},
          {align: 'center',text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', sortable:false, value: 'amount'},
        ],
        expenses: [
        ],
        payments : [
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

            this.expenses = []
            this.payments = []
            for(let idx in response.body){
              response.body[idx].date = response.body[idx].date.match(/([0-9\-]+)T/)[1]
              if(response.body[idx].category == 'payment')
                this.payments.push(response.body[idx]);
              else
                this.expenses.push(response.body[idx]);
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
