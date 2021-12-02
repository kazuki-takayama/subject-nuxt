<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-btn color="primary" dark class="mb-2">new Item</v-btn>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.delete="{ item }">
            <v-btn small color="error" @click="deleteItem(item)">delete</v-btn>
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
          value: 'name',
        },
        {
          text: '削除',
          value: 'delete',
          sortable: false
        }
      ],
      serverDatas: [
      ],
      items: [
        {
        Todo: 1,
        name: "",
        name: ""
        },
        {
        予定: 2,
        name: "",
        name: ""
        },
        {
        完了: 3,
        name: "資料作成",
        name: "資料作成"
        },
      ],
    }
  },

  

  mounted() {
    axios.get('http://localhost:4000')
    .then(response => this.items = response.data);
  },
  methods: {
    deleteItem(item) {
      const index = this.serverDatas.indexOf(item)
      confirm('削除しますか') && this.items.splice(index, 1)
    },
    addItem() {
      axios.post('http://localhost:4000/add', )
      .then(response => this.items = response.data);
    }
  },
}
</script>

