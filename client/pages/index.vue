<template>
  <v-container>
    <v-row>
      
      <v-col cols="10">
        <v-dialog
            v-model="dialog"
            max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                TODO追加
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="todo"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="create"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import axios from 'axios';
export default {

  asyncData() {
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
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
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
      const
    axios.delete(`http://localhost:4000/todos/${item._id}`).then(res => {    
    console.log(item._id);
    console.log(res.data);  
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.items.splice(this.editedIndex, 1)
      this.items()
      this.dialogDelete = true
    })
    }
  },
}
</script>

