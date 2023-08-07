<template>
  <v-app>
    <v-main>
      <div v-if="loading">loading ...</div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',

  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user', 'loading']),
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  async created() {
    await this.fetchUser();
  },
});
</script>
