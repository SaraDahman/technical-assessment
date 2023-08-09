<template>
  <v-card>
    <v-img
      class="align-end text-white"
      height="300"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
      :src="data.image"
      cover
    >
      <v-card-title style="color: #fff; font-size: 1.8rem">
        {{ data.title }}
      </v-card-title>
    </v-img>
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
