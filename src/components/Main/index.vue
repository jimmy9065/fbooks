<template>
  <v-container fill-height >
    <v-layout column wrap justify-center>
      <v-flex>
        <v-card column >
            <v-progress-linear v-bind:indeterminate="true" v-bind:active="!dataLoaded">
            </v-progress-linear>

            <v-container class="pa-0" >
            <v-card-title class="pt-1 pb-1" color="gray">
            <strong>Expenses:</strong>
            </v-card-title>
            <v-data-table
              v-bind:headers="expenseHeaders"
              v-bind:items="expenses"
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

            <v-card-title class="pt-1 pb-1" color="gray">
            <strong>Payments:</strong>
            </v-card-title>
            <v-data-table
              v-bind:headers="paymentHeaders"
              v-bind:items="payments"
              hide-actions
              must-sort
              v-bind:pagination.sync = "pagination"
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr v-bind:id="props.item.idx" @click="showEditMenu($event)">
                <td class="text-xs-center">{{ props.item.date }}</td>
                <td class="text-xs-center">{{ props.item.owner }}</td>
                <td class="text-xs-center">{{ (-props.item.amount/100).toFixed(2) }}</td>
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
                <v-spacer></v-spacer>
                <v-speed-dial
                  v-model="fab"
                  :right=true
                  :top = true
                  direction="left"
                  transition='slide-y-reverse-transition'
                  >
                    <v-btn
                        slot="activator"
                        color="red accent-2"
                        dark
                        fab
                        v-model="fab"
                      >
                        <v-icon x-large>add</v-icon>
                        <v-icon x-large>close</v-icon>
                      </v-btn>
      
                    <v-btn
                      v-bind:disabled="!this.dataLoaded"
                      dark
                      fab
                      right
                      small
                      color="indigo"
                      @click="showAddMenu"
                    >
                      <v-icon>add_shopping_cart</v-icon>
                    </v-btn>

                    <v-btn
                      v-bind:disabled="!this.dataLoaded"
                      dark
                      fab
                      right
                      small
                      color="green"
                      @click="showPaymentMenu"
                    >
                      <v-icon>credit_card</v-icon>
                    </v-btn>
                </v-speed-dial>
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
                    v-bind:value="submitCategory"
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

      <v-dialog v-model="payDialog" persistent max-width="350px">
        <v-card >
          <v-card-title class="pb-0 pt-3">
            <h2>{{dialogTitle}}</h2>
          </v-card-title>

          <v-card-text class='pa-1'>
            <v-container v-if="!isPicking">
            <v-text-field 
              label="Amount" 
              v-model="submitAmount" 
              prepend-icon="attach_money"
              ref="paymentAmountText"
              :rules=amountRules></v-text-field>
            <v-text-field
              label="Date in M-D-Y format"
              v-model="submitDate"
              prepend-icon="event"
              @focus="isPicking = true"
              readonly
              ref="paymentDateText"
              :rules=dateRules></v-text-field>
            </v-container>
            <v-container class='pa-0' v-else>
              <v-date-picker v-model="choosingDate" v-on:input="chosenDate = formatDate($event)" no-title scrollable></v-date-picker>
            </v-container>
            </v-card-text>
            <v-card-actions class='pa-0 pb-3'>
              <v-container class='pa-0' v-if="!isPicking">
                <v-layout >
                <v-btn flat color="primary" 
                  :disabled=disableDelete
                  @click="submitDel">Delete</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" 
                    @click="openPayDialog=false"
                    >Cancel</v-btn>
                  <v-btn flat color="primary"
                    @click="submitForm"
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
        titleRules: [
          (v) => !!v || 'Title is required',
          (v) => v && v.length <= 25 || 'Title must be less than 10 characters',
        ],
        categoryRules: [
          (v) => !!v || 'Category is required',
        ],
        amountRules: [
          (v) => !!v || 'Amount is required',
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
        openPayDialog: false,
        disableDelete: true,
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
        categories: [
          'Grocery', 'Tools', 'Rent', 'Utility', 'Others'
        ],
        pagination: {
          sortBy: 'date',
          descending: true,
          rowsPerPage: -1,
        },
        dueAmount: 0,

        fab: false,
        fling: false,
        tabs: null,
      }
    },
    methods: {
      showPaymentMenu() {
        console.log('payment Menu');
        this.dialogTitle = 'Add Payment';
        this.isPicking = false;
        this.submitDate = '';
        this.submitAmount = '';
        this.submitCategory = "payment";
        this.resetForm();
        this.openPayDialog = true;
        this.disableDelete=true;
        console.log(this.submitCategory)
      },
      showAddMenu() {
        console.log('expenses Menu');
        this.dialogTitle = 'Add Item';
        this.isPicking = false;
        this.submitDate = '';
        this.submitTitle = '';
        this.submitCategory = "Others";
        this.submitAmount = '';
        this.resetForm();
        this.openDialog = true;
        this.disableDelete=true;
      },
      showEditMenu(event) {
        let type = event.target.parentElement.id.slice(0,1);
        let idx = event.target.parentElement.id.slice(1);
        if(type == 'p')
          this.showEditPaymentMenu(idx);
        else
          this.showEditExpenseMenu(idx);
      },
      showEditExpenseMenu(idx) {
        if(this.expenses[idx].owner != this.$store.state.username)
          return;
        this.resetForm();
        this.disableDelete=false;
        this.dialogTitle = 'Edit Item'
        this.isPicking = false;

        this.submitCategory = this.expenses[idx].category;
        this.submitDate = this.expenses[idx].date;
        this.submitTitle = this.expenses[idx].description;
        this.submitAmount = (this.expenses[idx].amount/100).toFixed(2);
        this.submitIdx = this.expenses[idx].idx;
        this.openDialog = true;
        console.log(this.expenses[idx])
      },
      showEditPaymentMenu(idx) {
        if(this.payments[idx].owner != this.$store.state.username)
          return;
        this.resetForm();
        this.disableDelete = false;
        this.dialogTitle = 'Edit Payment';
        this.isPicking = false;

        this.submitCategory = "payment";
        this.submitDate = this.payments[idx].date;
        this.submitAmount = -(this.payments[idx].amount/100).toFixed(2);
        this.submitIdx = this.payments[idx].idx;
        this.openPayDialog = true;
      },
      submitForm() {
        let newItem = {};
        let command = null;
        let add = false;

        if(!this.validateForm()){
          console.log('validation failed')
          return;
        }
        console.log('form is valid')

        if(this.dialogTitle.slice(0,3)=='Add'){
          console.log('Adding');
          add = true;
          command = 'insert';
          newItem.date = this.submitDate;
          newItem.category = this.submitCategory;
          newItem.description = this.submitTitle;
          newItem.category = this.submitCategory;
          newItem.owner = this.$store.state.username;
          newItem.amount = Math.floor(this.submitAmount*100);
          console.log(this.submitCategory)
          console.log('temp newItem');
          console.log(newItem)
          if(newItem.category == 'payment'){
            console.log('payment');
            newItem.amount = - newItem.amount;
            this.$store.dispatch('aInsertPayment').then(() => {
              this.openPayDialog = false;
            });
            newItem.idx = 'p' + this.payments.length;
            this.payments.push(newItem);
          }
          else{
            console.log('expense');
            this.$store.dispatch('aInsertRecord').then(() => {
              this.openDialog = false;
            });
            newItem.idx = 'e' + this.expenses.length;
            this.expenses.push(newItem);
          }
          console.log('here is new Item:')
          console.log(newItem);
        }
        else{
          console.log('Editing')
          let type = this.submitIdx.slice(0,1);
          let idx = this.submitIdx.slice(1);
          if(type == "p"){
            console.log(this.payments[idx])
            let recordId = this.payments[idx]._id;
            command = 'update/' + recordId;
            this.payments[idx].date = this.submitDate;
            this.payments[idx].category = 'payment';
            this.payments[idx].amount = -Math.floor(this.submitAmount*100);
            this.$store.dispatch('aUpdatedPayment').then(() => {
              this.openPayDialog = false;
            });
            newItem = this.payments[idx];
          }
          else{
            let recordId = this.expenses[idx]._id;
            command = 'update/' + recordId;
            this.expenses[idx].date = this.submitDate;
            this.expenses[idx].description = this.submitTitle;
            this.expenses[idx].category = this.submitCategory;
            this.expenses[idx].amount = Math.floor(this.submitAmount*100);
            this.$store.dispatch('aUpdateRecord').then(() => {
              this.openDialog = false;
            });
            newItem = this.expenses[idx];
          }
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
        .then(response => {
          console.log('inserted/updated record/payment');
          if(add){
            if(newItem.category == 'payment'){
              this.payments[this.payments.length-1]._id = response.body._id;
              vm.$store.dispatch("aInsertedPayment");
            }
            else{
              console.log('_id = ' + response.body._id);
              this.expenses[this.expenses.length-1]._id = response.body._id;
              console.log('the element: ')
              console.log(this.expenses[this.expenses.length-1]);
              vm.$store.dispatch("aInsertedRecord");
            }
          }
          else{
            if(newItem.category == 'payment')
              vm.$store.dispatch("aUpdatedPayment");
            else
              vm.$store.dispatch("aUpdatedRecord");
          }
        }, response => {
          console.log('insert/update record/payment faild');
          if(newItem.category == 'payment'){
            vm.$store.dispatch("aUpdatedPayment");
            vm.$store.dispatch("aInsertedPayment");
          }
          else{
            vm.$store.dispatch("aUpdatedRecord");
            vm.$store.dispatch("aInsertedRecord");
          }
        })
      },
      validateForm() {
        let a = true, b=true, c=true, d=true;
        if(this.dialog){
          a = this.$refs.titleText.validate(true);
          b = this.$refs.amountText.validate(true);
          c = this.$refs.dateText.validate(true);
          d = this.$refs.categoryText.validate(true);
        }
        else{
          b = this.$refs.amountText.validate(true);
          c = this.$refs.dateText.validate(true);
        }

        return a && b && c && d;
      },
      resetForm() {
        this.$refs.titleText.reset();
        this.$refs.amountText.reset();
        this.$refs.dateText.reset();
        this.$refs.categoryText.reset();
        this.$refs.paymentAmountText.reset();
        this.$refs.paymentDateText.reset();
      },
      submitDel() {
        console.log(this.submitIdx);
        if(this.submitCategory == "payment")
          this.deletePayment(this.submitIdx.slice(1));
        else
          this.deleteExpense(this.submitIdx.slice(1));
      },
      deleteExpense(idx) {
        console.log('delete a expense');
        let recordId = this.expenses[idx]._id;

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
            console.log('deleted record');
            vm.$store.dispatch("aDeletedRecord")
            vm.expenses.splice(idx, 1)
          }, response => {
            console.log('failed to delete record');
            vm.$store.dispatch("aDeletedRecord");
          })
      },
      deletePayment(idx) {
        let recordId = this.payments[idx]._id;

        this.$store.dispatch("aDeletePayment").then(() =>{
          this.openPayDialog = false;
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
            console.log('deleted payment');
            vm.$store.dispatch("aDeletedPayment")
            vm.payments.splice(idx,1)
          }, response => {
            console.log('failed to delete payment');
            vm.$store.dispatch("aDeletedPayment");
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
            vm.expenses = [];
            vm.payments = [];
            let expenseIdx = 0, paymentIdx = 0;

            let trans = response.body;
            console.log(trans)
            console.log(typeof trans)
            for(let idx in trans){
              trans[idx].date = trans[idx].date.match(/([0-9\-]+)T/)[1]
              if(trans[idx].category == "payment"){
                trans[idx].idx = 'p' + paymentIdx;
                paymentIdx += 1;
                this.payments.push(trans[idx]);
              }
              else{
                trans[idx].idx = 'e' + expenseIdx;
                expenseIdx += 1;
                this.expenses.push(trans[idx]);
              }
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
      payDialog: function() {
        return this.openPayDialog || this.$store.getters.isSumbmittingPayment;
      },
      due: function() {
        return this.dueAmount>0 ? this.dueAmount: 0;
      }
    }
  }
</script>
