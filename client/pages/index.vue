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
                <span class="text-h5">{{ formTitle }}</span>
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
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">削除しますか？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.delete="{ item }">
            <v-btn small color="error" @click="deleteItem(item)">delete</v-btn>
          </template>
          <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        Save
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
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

  editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'TODO追加' : 'Edit Item'
    },
  },

  mounted() {
    axios.get('http://localhost:4000')
    .then(response => this.items = response.data);
  },
  methods: {
      deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    addItem() {
      axios.post('http://localhost:4000/add', )
      .then(response => this.items = response.data);
    },
      deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    create () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

