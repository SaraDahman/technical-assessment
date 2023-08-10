<template>
  <div class="not-found">
    <h2>page bot found ...</h2>
    <v-btn @click="() => $router.push('/')"> Go Home </v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style>
.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  margin-bottom: 2rem;
}
</style>
