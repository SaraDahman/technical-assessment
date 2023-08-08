<template>
  <v-card>
    <v-img class="align-end text-white" height="300" :src="data.image" contain>
    </v-img>
    <v-card-title>{{ data.title }}</v-card-title>
    <v-card-subtitle class="pt-4"> by {{ data.author }} </v-card-subtitle>
    <v-card-text>
      <p>
        {{ data.description.substring(0, 20) }}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="#4DD0E1"
        @click="() => $router.push({ name: 'oneBook', params: data.id })"
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
  data() {
    return {};
  },
  props: ['data'],
});
</script>
