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
              must-sort
              v-bind:pagination.sync = "pagination"
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr v-bind:id="props.item.idx" @click="showEditMenu($event)">
                <td class="text-xs-center">{{ props.item.date }}</td>
                <td class="text-xs-center">{{ props.item.description }}</td>
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
                  <h3>Total Due: ${{due}}</h3>
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
                  <v-text-field 
                    label="Title" 
                    v-model="submitTitle" 
                    prepend-icon="receipt"
                    ref="titleText"
                    :counter=25
                    :rules=titleRules></v-text-field>
                  <v-select
                    v-bind:items="categories"
                    v-model="submitCategory"
                    label="Category"
                    prepend-icon="format_list_bulleted"
                    ref="categoryText"
                    item-value="text"
                    :rules=categoryRules></v-select>
                  <v-text-field 
                    label="Amount" 
                    v-model="submitAmount" 
                    prepend-icon="attach_money"
                    ref="amountText"
                    :rules=amountRules></v-text-field>
                  <v-text-field
                    label="Date in M-D-Y format"
                    v-model="submitDate"
                    prepend-icon="event"
                    @focus="pickingDate"
                    readonly
                    ref="dateText"
                    :rules=dateRules></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-text v-else>
            <v-date-picker v-model="choosingDate" v-on:input="chosenDate = formatDate($event)" no-title scrollable>
            </v-date-picker>
          </v-card-text>
          <v-card-actions class='pa-0 pb-3'>
            <v-container class='pa-0' v-if="!isPicking">
              <v-layout >
                <v-btn flat color="primary" 
                  :disabled=disableDelete
                  @click="submitDel">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" 
                  @click="openDialog=false">Cancel</v-btn>
                <v-btn flat color="primary"
                  @click="submitForm"
                  :disabled="!valid"
                  >Submit</v-btn>
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
        valid: true,
        titleRules: [
          (v) => !!v || 'Title is required',
          (v) => v && v.length <= 25 || 'Title must be less than 10 characters',
        ],
        categoryRules: [
          (v) => !!v || 'Category is required',
        ],
        amountRules: [
          (v) => !!v || 'Title is required',
          (v) => v && v > 0.01 && v<10000 || 'Amount must be postive and less than 10000.00',
        ],
        dateRules: [
          (v) => !!v || 'Date is required',
        ],
        dialogTitle: '',
        choosingDate: '',
        chosenDate: '',
        isPicking: false,
        submitDate: '',
        submitCategory: '',
        submitTitle: '',
        submitAmount: '',
        submitIdx: '',
        openDialog: false,
        disableDelete: true,
        headers: [
          {align: 'center', text: 'Date', value: 'date'},
          {align: 'center', text: 'Title', sortable: false, value: 'description'},
          {align: 'center', text: 'Category', sortable: false, value: 'category'},
          {align: 'center', text: 'Owner', sortable: false, value: 'owner'},
          {align: 'center', text: 'Amount', value: 'amount'},
        ],
        items : [
          {}
        ],
        categories: [
          'grocery', 'tools', 'rent', 'utility', 'others', 'payment',
        ],
        pagination: {
          sortBy: 'date',
          descending: true,
          rowsPerPage: -1,
        },
        dueAmount: 0,
      }
    },
    methods: {
      showAddMenu() {
        this.dialogTitle = 'Add Item';
        this.isPicking = false;
        this.submitDate = '';
        this.submitTitle = '';
        this.submitCategory = 'others';
        this.submitAmount = '';
        this.openDialog = true;
        this.resetForm();
        this.disableDelete=true;
      },
      showEditMenu(event) {
        let idx = event.target.parentElement.id
        if(this.items[idx].owner != this.$store.state.username)
          return;
        this.resetForm();
        this.disableDelete=false;
        this.dialogTitle = 'Edit Item'
        this.isPicking = false;
        this.submitDate = this.items[idx].date;
        this.submitCategory = this.items[idx].category;
        this.submitTitle = this.items[idx].description;
        this.submitAmount = (this.items[idx].amount/100).toFixed(2);
        this.submitIdx = this.items[idx].idx;
        this.openDialog = true;
      },
      submitForm() {
        let newItem = {};
        let command = null;

        if(!this.validateForm()){
          return;
        }
        console.log('form is valid')

        if(this.dialogTitle=='Add Item'){
          command = 'insert';
          newItem.date = this.submitDate;
          newItem.category = this.submitCategory;
          newItem.description = this.submitTitle;
          newItem.category = this.submitCategory;
          newItem.amount = Math.floor(this.submitAmount*100);
          newItem.owner = this.$store.state.username;
          this.$store.dispatch('aInsertRecord').then(() =>{
            this.openDialog = false;
          });

          newItem.idx = this.items.length;
          this.items.push(newItem);
        }
        else{
          let idx = this.submitIdx;
          let recordId = this.items[idx]._id;
          command = 'update/' + recordId;
          this.items[idx].date = this.submitDate;
          this.items[idx].description = this.submitTitle;
          this.items[idx].category = this.submitCategory;
          this.items[idx].amount = Math.floor(this.submitAmount*100);
          //this.items[idx].amount = this.submitAmount*100;
          this.$store.dispatch('aUpdateRecord').then(() =>{
            this.openDialog = false;
          });
          newItem = this.items;
        }

        let vm = this;

        this.$http.put(
          this.$store.state.backendServer+':8081/api/trans/'+command,
          newItem,
          {credentials:true,
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response =>{
          console.log('insert/update record');
          vm.$store.dispatch("aUpdatedRecord");
        }, response => {
          console.log('insert/update record faild');
          vm.$store.dispatch("aUpdatedRecord");
        })
      },
      validateForm() {
        let a = this.$refs.titleText.validate(true);
        let b = this.$refs.amountText.validate(true);
        let c = this.$refs.dateText.validate(true);
        let d = this.$refs.categoryText.validate(true);

        return a && b && c && d;
      },
      resetForm() {
        this.$refs.titleText.reset();
        this.$refs.amountText.reset();
        this.$refs.dateText.reset();
        this.$refs.categoryText.reset();
      },
      submitDel() {
        let recordId = this.items[this.submitIdx]._id;

        this.$store.dispatch("aDeleteRecord").then(() =>{
          this.openDialog = false;
        });

        let vm = this;
        this.$http.delete(
          this.$store.state.backendServer+':8081/api/trans/del/' + recordId,
          {credentials:true,
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            console.log('failed to delete record');
            vm.$store.dispatch("aDeletedRecord")
            vm.items.splice(vm.submitIdx,1)
          }, response => {
            console.log('failed to delete record');
            vm.$store.dispatch("aDeletedRecord");
          })
      },
      formatDate (date) {
        console.log(date)
        if (!date) {
          return null;
        }
        //format date in the future
        return date;
      },
      pickingDate() {
        this.isPicking = true;
      },
      updateDataTable() {
        console.log("Update DataTable")
        this.$store.dispatch("aUpdateDT");
        this.$store.dispatch("aUpdateDue");

        let vm = this;
        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/RecentTrans',
          {credentials:true})
          .then(response =>{
            console.log('Get Data')
            vm.$store.dispatch("aUpdatedDT");
            vm.items = [];

            let trans = response.body;
            console.log(trans)
            console.log(typeof trans)
            for(let idx in trans){
              trans[idx].date = trans[idx].date.match(/([0-9\-]+)T/)[1]
              trans[idx].idx = idx;
              this.items.push(trans[idx]);
            }
          }, response => {
            console.log('error when query recent');
            vm.$store.dispatch("aUpdatedDT");
          })

        this.$http.get(
          this.$store.state.backendServer + ':8081/api/trans/due',
          {credentials:true})
          .then(response =>{
            console.log('Get Due')
            this.dueAmount = (response.body.due/100).toFixed(2);
            vm.$store.dispatch("aUpdatedDue");
          }, response => {
            console.log('Error when query due')
            vm.$store.dispatch("aUpdatedDue");
          })
      },
    },
    computed: {
      dataLoaded: function(){
        return this.$store.getters.isLoaded;
      },
      dialog: function() {
        return this.openDialog || this.$store.getters.isChaningRecord;
      },
      due: function() {
        return this.dueAmount>0 ? this.dueAmount: 0;
      }
    }
  }
</script>
