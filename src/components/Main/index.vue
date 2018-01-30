<template>
  <v-container fill-height >
    <v-layout column wrap justify-center>
      <v-flex>
        <v-card column >
            <v-progress-linear v-bind:indeterminate="true" v-bind:active="!dataLoaded">
            </v-progress-linear>

            <v-container class="pa-0" >
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr @click="showEditMenu">
                <td class="text-xs-center">{{ props.item.dates }}</td>
                <td class="text-xs-center">{{ props.item.category }}</td>
                <td class="text-xs-center">{{ props.item.owner }}</td>
                <td class="text-xs-center">{{ (props.item.amount/100).toFixed(2) }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                  Sorry, nothing to display here :(
                </v-alert>
              </template>
            </v-data-table>
              <v-footer class="pa-3" color="gray">
                <v-tooltip bottom>
                  <v-btn 
                    icon 
                    slot="activator" 
                    @click="this.updateDataTable" 
                    color="blue"
                    v-bind:loading="!dataLoaded"
                    dark
                    id="refresh"
                    >
                    <v-icon>cached</v-icon>
                  </v-btn>
                  <span>Refresh</span>
                </v-tooltip>
                <v-container class="pa-1">
                  <v-layout row>
                    <div class="pa-2">
                      <h3>Total Due: {{dueAmount}}</h3>
                    </div>
                    <v-btn
                      absolute
                      v-bind:disabled="!this.dataLoaded"
                      dark
                      fab
                      bottom
                      right
                      large
                      color="pink"
                      @click="showAddMenu"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-layout>
                </v-container>
              </v-footer>
            </v-container>
        </v-card>
      </v-flex>

      <v-dialog v-model="dialog" persistent max-width="350px">
        <v-card>
          <v-card-title class="pb-0 pt-4">
            <h2>{{dialogTitle}}</h2>
          </v-card-title>
          <v-card-text>
            <v-container class="pt-0 pb-0" v-if="!isPicking">
              <v-layout wrap align-center>
                <v-flex xs12 sm6 md10>
                  <v-text-field label="Title" v-model="submitTitle" prepend-icon="list"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <v-text-field label="Amount"v-model="submitAmount" prepend-icon="attach_money"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <v-text-field
                    slot="activator"
                    label="Date in M-D-Y format"
                    v-model="submitDate"
                    prepend-icon="event"
                    @click="pickingTime"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container v-else class='pa-0'>
              <v-date-picker v-model="tempDate" @input="submitDate = formatDate($event)" no-title scrollable actions>
              </v-date-picker>
            </v-container>
          </v-card-text>
          <v-card-actions class='pt-0'>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog=false">Cancel</v-btn>
            <v-btn flat color="primary" @click="submitForm">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </v-container>

</template>

<script>
  export default {
    created(){
      console.log("loading data")
      this.updateDataTable();
    },
    data () {
      return {
        dialog: false,
        dialogTitle: '',
        submitDate: '',
        tempDate: null,
        isPicking: false,
        submitTitle: '',
        submitAmount: '',
        headers: [
          {align: 'center', text: 'Date', value: 'dates'},
          {align: 'center', text: 'Title', sortable: false, value: 'category'},
          {align: 'center',text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', value: 'amount'},
        ],
        items : [
          {
            category: 'Frozen Yogurt',
            owner: 'haa',
            amount: '159',
            dates: '2018-1-21',
            description: 'N/A',
            _id: 100,
          },
        ],
        dueAmount: 0,
      }
    },
    methods: {
      showAddMenu() {
        //show new dialog
        this.dialogTitle = 'Add Item'
        this.dialog = true;
      },
      showEditMenu() {
        this.dialogTitle = 'Edit Item'
        //show new dialog
        this.dialog = true;
      },
      submitForm(isAdd) {
        //submit form use model submitTitle submitAmount submitDate
        //ower is username 
        //ignore share first, defualt to true
        this.dialog = false;
      },
      formatDate (date) {
        if (!date) {
          return null;
        }
        
        this.isPicking = false;
        return date;
      },
      pickingTime() {
        this.isPicking = true;
      },
      updateDataTable() {
        console.log("update dataTable")
        this.$store.dispatch("aUpdateDT");

        let vm = this;
        setTimeout(function(){
          vm.$store.dispatch("aFinishDT");
        }, 1500);
      },
    },
    computed: {
      dataLoaded: function(){
        return this.$store.getters.isLoaded;
      }
    }
  }
</script>
