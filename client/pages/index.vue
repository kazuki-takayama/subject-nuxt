<template>
  <v-container>
    <v-row>
      
      <v-col cols="10">

        <addition @add="add"></addition>

        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.delete="{ item }">
            <v-btn small color="error" @click="remove(item)">delete</v-btn>
          </template>
          <template v-slot:item.actions="{ item }">
    </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

  import axios from 'axios';
  import addition from '~/components/addition.vue'
  export default defineComponent ({
    emits: ['add'],
  components: {
    addition,
  },
  
    setup(items)  {
    return {
      posts: [],
      headers: [
        {
          text: 'Todo',
          value: 'id',
        },
        {
          text: '予定',
          value: 'name',
        },
        {
          text: '完了',
          value: 'task',
        },
        {
          text: '削除',
          value: 'delete',
          sortable: false
        }
      ],
      defaultItem: {
        name: '',
      },
      
    
　add: function(){
　  this.editedItem = false
  items.push( this.editedItem );
　},


      defaultItem: {
      name: '',
    },
    editedItem: {
      name: '',
    },
      serverDatas: [
      ],
      items: [
        
      ],
    }
    },
  
  getRate(){
    axios.get('http://localhost:4000')
    then(response => this.items = response.data);
  },

  
  remove(item) {
    console.log(item._id)
    console.log(item)
    axios.delete(`http://localhost:4000/todos/${item._id}`).then(res => {    
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.items.splice(this.editedIndex, 1)
      this.dialogDelete = true
    })
    }
    
  })


  
</script>

