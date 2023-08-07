<template>
  <v-card>
    <v-img
      class="align-end text-white"
      height="300"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
    </v-img>
    <v-card-title>Top 10 Australian beaches</v-card-title>
    <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>
    <v-card-text>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
        inventore consectetur esse...
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="#4DD0E1"
        @click="() => $router.push({ name: 'oneBook', params: '5' })"
      >
        See More
      </v-btn>

      <v-btn color="red"> Delete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import router from '@/router';
import Vue from 'vue';

export default Vue.extend({
  data: () => ({}),
});
</script>
