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
                <td class="text-xs-center">{{ props.item.dates }}</td>
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
