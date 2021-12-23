<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <addition>
          </addition>
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
  import addition from '~/components/addition.vue'
  export default {
  components: {
    addition,
  }
}

  
</script>

