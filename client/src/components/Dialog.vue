<template>
  <v-dialog :value="dialog" persistent width="500">
    <v-card>
      <v-card-title class="text-h5"> Warning</v-card-title>
      <v-card-text>
        Are you sure you want to do this action? It cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog" color="#4DD0E1"> No </v-btn>
        <v-btn text @click="deleteBook" color="red"> Yes </v-btn>
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
