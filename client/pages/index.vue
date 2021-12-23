<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <addition　@click="close"> </addition>
        <addition　@click="create"> </addition>
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
import addition from './components/addition.vue'
import axios from 'axios';
export default {
  components: {
    addition,
  },

  mounted() {
    axios.get('http://localhost:4000')
    .then(response => this.items = response.data);
  },
  methods: {
      
    close () {
      this.dialog = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
    },
    
    create () {
      this.items.push(this.editedItem)
    axios.post('http://localhost:4000/add',this.editedItem)
    .then(response => {
        console.log('response :editedItem', response.item);
    });
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
  },
}
</script>

