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
export default defineComponent ({

  setup()  {
    return {
      posts: [],
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


  methods: {
      close () {
      this.dialog = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
      this.$emit('close',this.editedItem);
  },
    

    create () {
    axios.post('http://localhost:4000/add',this.editedItem)
    .then(response => {
        console.log('response :editedItem', response.data);
    });
    this.$emit('add',this.editedItem);
    },
  },
})
</script>

