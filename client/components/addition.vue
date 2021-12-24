    <template>
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2"
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
        
</template>

<script>
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import axios from 'axios';
import { nextTick } from '@nuxtjs/composition-api'
import { 
    onMounted,
  }from '@nuxtjs/composition-api'
export default defineComponent ({

  setup()  {
    
  const editedItem = reactive ({
  name: ''
})
  const defaultItem = reactive ({
  name: ''
})
  const editedIndex = reactive ({
  editedIndex:-1
})
  const dialogDelete = reactive ({
  dialogDelete: false
})

const dialog = reactive ({
  dialog: false
})
const items = reactive ({
  items:[
  ]
})


  onMounted (() => {
      close () ;{
      dialog = false
      $nextTick(() => {
      items.items = Object.assign({}, items.defaultItem)
      editedIndex = -1
      })
      $emit('close',this.editedItem);
  }
    
    create () ;{
    axios.post('http://localhost:4000/add',items.items)
    .then(response => {
        console.log('response :editedItem', response.data);
    });
    $emit('add',items.items);
    }
  })

  return {
        editedItem,
      // posts: [],
      dialog,
      dialogDelete,
      editedIndex,
      defaultItem,
      // editedItem: {
      //   name: '',
      // },
      // serverDatas: [
      // ],
      items,
    }
  },
})
</script>

