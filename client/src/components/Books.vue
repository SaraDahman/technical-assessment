<template>
  <v-card>
    <v-tabs color="deep-purple accent-4" left>
      <v-tab>Landscape</v-tab>
      <v-tab>City</v-tab>
      <v-tab>Abstract</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container class="test">
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="4">
              <Card />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from './Card.vue';

export default Vue.extend({
  data: () => ({
    tab: null,
  }),
  components: {
    Card,
  },
});
</script>

<style>
.test {
  height: 706px;
  max-height: 706px;
  overflow: auto;
  box-shadow: none;
}
</style>
