<template>
  <v-container fill-height>
    <v-layout column wrap justify-center>
      <v-flex>
        <v-card column>
            <!--v-progress-linear v-bind:indeterminate="true" v-if="!dataLoaded"-->
            <v-progress-linear v-bind:indeterminate="true" v-bind:active="!dataLoaded">
            </v-progress-linear>

            <v-container class="pa-0" >
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr @click="showMenu">
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
                      @click="addDialog=true"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-layout>
                </v-container>
              </v-footer>
            </v-container>
        </v-card>
      </v-flex>

    <v-dialog v-model="addDialog" persistent max-width="350px">
      <v-card>
        <v-card-title class="pb-0 pt-4">
          <h2>Add Record</h2>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0 pb-0">
            <v-layout wrap align-center>
              <v-flex xs12 sm6 md10>
                <v-text-field label="Title" v-model="submitTitle"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md10>
                <v-text-field label="Amount"v-model="submitAmount"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md10>
                <v-text-field label="Date" v-model="submitDate"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class='pt-0 pb-2'>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="addDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addDialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal last name" hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="editDialog = false">Save</v-btn>
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
        addDialog: false,
        editDialog: false,
        submitDate: '',
        submitTitle: '',
        submitAmount: '',
        headers: [
          {
            align: 'center',
            text: 'Date',
            value: 'dates'
          },
          {
            align: 'center',
            text: 'Title',
            sortable: false,
            value: 'category'
          },
          {
            align: 'center',
            text: 'Owner',
            sortable: false,
            value: 'owner'
          },
          {
            align: 'center',
            text: 'Amount',
            value: 'amount'
          },
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
          {
            category: 'Frozen Yogurt',
            owner: 'haa',
            amount: '100',
            dates: '2018-1-20',
            description: 'N/A',
            _id: 100,
          },
        ],
        dueAmount: 0,
      }
    },
    methods: {
      showMenu() {
        //show new dialog
      },
      submitForm() {
        //submit form use model submitTitle submitAmount submitDate
        //ower is username 
        //ignore share first, defualt to true
      },
      updateDataTable() {
        console.log("update dataTable")
        this.$store.dispatch("aUpdateDT");

        let vm = this;
        setTimeout(function(){
          vm.$store.dispatch("aFinishDT");
        }, 2000);
      },
    },
    computed: {
      dataLoaded: function(){
        return this.$store.getters.isLoaded;
      }
    }
  }
</script>
