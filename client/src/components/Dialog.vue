<template>
  <v-dialog :value="dialog" persistent width="500">
    <v-card>
      <v-card-title class="text-h5"> Delete Warning</v-card-title>
      <v-card-text>
        Are you sure you want to delete this item? This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="closeDialog"> No </v-btn>
        <v-btn variant="text" @click="deleteBook" color="warning"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['dialog', 'closeDialog', 'deleteBook'],
  data() {
    return {
      isVisible: false,
    };
  },
});
</script>
