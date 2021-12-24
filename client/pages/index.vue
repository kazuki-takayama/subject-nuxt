<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <!-- <addition @add="add"></addition> -->

        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.delete="{ item }">
            <v-btn small color="error" @click="remove(item)">delete</v-btn>
          </template>
          <template v-slot:item.actions="{ item }"> </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

  import axios from 'axios';
  import addition from '~/components/addition.vue'
  import { 
    onMounted,
  }from '@nuxtjs/composition-api'
  export default defineComponent ({
    emits: ['add'],
  components: {
    addition,
  },
  
    setup()  {

　const add = () => {
　  editedItem = false
  items.push( editedItem.name );
　}
const headers = reactive ({
  headers:[
  {text: 'Todo',value: 'id'},
  {text: '予定',value: 'name'},
  {text: '完了',value: 'task'},
  {text: '削除',value: 'delete',sortable: false},
  ]
})
const items = reactive ({
  items:[
  ]
})


const editedItem = reactive ({
  name: ''
})

const defaultItem = reactive ({
  name: ''
})

const serverDatas = reactive ({
  items:[]

})


  onMounted (() => {
    axios.get('http://localhost:4000')
    .then(response => items.items = response.data)
    console.log('items >>>>>>>', items.items)
        

  remove(item) ;{
    console.log(item._id)
    console.log(item)
    axios.delete(`http://localhost:4000/todos/${item._id}`).then(res => {    
      this.editedIndex = items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.items.splice(this.editedIndex, 1)
      this.dialogDelete = true
    })
    
  }
    })

  

  return {
      posts: [],
      defaultItem,
      headers,
      add,
    editedItem,
  
    serverDatas,
    items,

  }
  }
    
    })
    


  
</script>

