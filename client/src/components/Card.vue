<template>
  <v-card>
    <v-img
      class="align-end text-white"
      height="300"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
      :src="data.image"
      cover
    >
      <v-card-title
        style="color: #fff; font-size: 1.8rem; text-transform: capitalize"
      >
        {{ data.title }}
      </v-card-title>
    </v-img>
    <v-card-subtitle class="pt-4">
      <span style="font-weight: bold">Author:</span> {{ data.author }}
    </v-card-subtitle>
    <v-card-text>
      <span style="font-weight: bold">Category:</span>
      {{ data.category }}
    </v-card-text>
    <v-card-text>
      <span style="font-weight: bold">Description:</span>
      {{ data.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="#4DD0E1"
        text
        @click="() => $router.push(`/dashboard/${data.id}`)"
      >
        Edit
      </v-btn>

      <v-btn
        color="red"
        text
        @click="dialog = true"
        :loading="loading"
        :disabled="loading"
      >
        Delete
      </v-btn>
    </v-card-actions>
    <!-- this is the dialog -->
    <Dialog
      :dialog="dialog"
      :closeDialog="closeDialog"
      :deleteBook="deleteBook"
      v-model="dialog"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from './Dialog.vue';
import axios from 'axios';

export default Vue.extend({
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  props: ['data', 'removeBook'],
  components: {
    Dialog,
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    async deleteBook() {
      this.dialog = false;
      try {
        this.loading = true;
        const { data } = await axios.delete(`/api/v1/books/${this.data.id}`);
        this.loading = false;
        this.removeBook(this.data.id);
        this.$toast(data.message);
      } catch (error) {
        //
        this.$toast.error('error');
      }
    },
  },
});
</script>
