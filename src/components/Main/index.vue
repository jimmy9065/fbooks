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
                <td class="text-xs-center">{{ props.item.date }}</td>
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
              <v-footer class="pa-4" color="gray">
                <v-tooltip bottom class="pa-0">
                  <v-btn 
                    icon 
                    slot="activator" 
                    @click="this.updateDataTable" 
                    color="blue"
                    v-bind:loading="!dataLoaded"
                    dark
                    >
                    <v-icon>cached</v-icon>
                  </v-btn>
                  <span>Refresh</span>
                </v-tooltip>
                <div>
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
              </v-footer>
            </v-container>
        </v-card>
      </v-flex>

      <v-dialog v-model="dialog" persistent max-width="350px">
        <v-card>
          <v-card-title class="pb-0 pt-3">
            <h2>{{dialogTitle}}</h2>
          </v-card-title>
          <v-card-text v-if="!isPicking">
            <v-container v-if="!isPicking" class="pt-0 pb-0" >
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
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <v-date-picker v-model="choosingDate" v-on:input="chosenDate = formatDate($event)" no-title scrollable>
              <v-btn @click="isPicking = false">
                <span>Save</span>
              </v-btn>
              <v-btn @click="isPicking = false">
                <span>Cancel</span>
              </v-btn>
            </v-date-picker>
          </v-card-text>
          <v-card-actions class='pa-0 pb-3'>
            <v-container class='pa-0' v-if="!isPicking">
              <v-layout >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" 
                  @click="dialog=false">Cancel</v-btn>
                <v-btn flat color="primary" 
                  @click="submitForm">Submit</v-btn>
              </v-layout>
            </v-container>
            <v-container class='pa-0' v-else>
              <v-layout >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" 
                  @click="isPicking=false">Cancel</v-btn>
                <v-btn flat color="primary" 
                  @click="submitDate=chosenDate;isPicking=false">Save</v-btn>
              </v-layout>
            </v-container>
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
        choosingDate: '',
        chosenDate: '',
        isPicking: false,
        submitTitle: '',
        submitAmount: '',
        headers: [
          {align: 'center', text: 'Date', value: 'date'},
          {align: 'center', text: 'Title', sortable: false, value: 'category'},
          {align: 'center',text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', value: 'amount'},
        ],
        items : [
          {}
        ],
        dueAmount: 0,
      }
    },
    methods: {
      showAddMenu() {
        //show new dialog
        this.dialogTitle = 'Add Item'
        this.dialog = true;
        this.isPicking = false;
        this.submitDate = '';
        this.submitTitle = '';
        this.submitAmount = '';
        
      },
      showEditMenu() {
        this.dialogTitle = 'Edit Item'
        //show new dialog
        this.dialog = true;
        this.isPicking = false;
      },
      submitForm(isAdd) {
        //submit form use model submitTitle submitAmount submitDate
        //ower is username 
        //ignore share first, defualt to true
        this.dialog = false;
      },
      formatDate (date) {
        console.log('instant happen')
        console.log(date)
        if (!date) {
          return null;
        }
        
        return date;
      },
      pickingTime() {
        this.isPicking = true;
      },
      updateDataTable() {
        console.log("update dataTable")
        this.$store.dispatch("aUpdateDT");

        let vm = this;
        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/allTrans',
          {credentials:true})
          .then(response =>{
            console.log('get HData')
            vm.$store.dispatch("aFinishDT");
            vm.items = [];

            for(let idx in response.body){
              response.body[idx].date = response.body[idx].date.match(/([0-9\-]+)T/)[1]
              this.items.push(response.body[idx]);
            }

          }, response => {
            console.log('no connection');
          vm.$store.dispatch("aFinishDT");
          })
      },
    },
    computed: {
      dataLoaded: function(){
        return this.$store.getters.isLoaded;
      }
    }
  }
</script>
