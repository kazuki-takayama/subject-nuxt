<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="items"
        >
        <template v-slot:item.delete="{ item }">
          <v-btn
            small
            color="error"
            @click="deleteItem(item)"
          >
            delete
          </v-btn>
        </template>
        </v-data-table>

      </v-col>
      </v-row>
  </v-container>
</template>


<script>
export default {

  data(){
    return {
      headers: [
          { 
            text: 'Todo', 
            value: 'id' 
          },
          {
            text: '予定',
            value: 'name',
          },
          { text: '完了', 
            value: 'name' 
          },
          {
            text:'削除',
            value:'delete',
            sortable:false
          }
        ],
        serverDatas:[

      ],

      items:[
        { 
          Todo : 1 , 
          name : "" , 
          name : ""
        },
        { 
          予定 : 2 , 
          name : "" , 
          name: ""
        },
        { 
          完了 : 3 , 
          name : "資料作成" , 
          name: "資料作成"
        },
      ],
      

    }
  },

  methods: {
　　deleteItem (item) {

    const index = this.serverDatas.indexOf(item)
  　  confirm('削除しますか') && this.items.splice(index, 1)
  
    
　 　  },

  },

}
　</script>