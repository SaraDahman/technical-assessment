<template>
  <v-app>
    <v-main>
      <Loader v-if="loading" />
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Loader from './components/Loader.vue';

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
  components: {
    Loader,
  },
});
</script>
