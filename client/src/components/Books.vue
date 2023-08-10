<template>
  <Loader v-if="loading" />
  <v-container v-else-if="error">
    Something went wrong, try again later
  </v-container>
  <v-card v-else class="py-10 test">
    <v-text-field
      class="mx-4"
      text
      label="Search"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    ></v-text-field>
    <v-tabs color="deep-purple accent-4" left>
      <v-tab>Landscape</v-tab>
      <v-tab>City</v-tab>
      <v-tab>Abstract</v-tab>

      <v-tab-item v-for="n in 3" :key="n">
        <v-container>
          <v-row v-if="!books.length">You have no books ...</v-row>
          <v-row v-else>
            <v-col v-for="book in books" :key="book.id" cols="4">
              <Card :data="book" :removeBook="removeBook" />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Card from './Card.vue';
import { IBook } from '../interfaces/IBook';
import Loader from './Loader.vue';

interface IProps {
  disabled: boolean;
  books: IBook[];
  error: number;
  tab: null | number;
  loading: boolean;
  search: string;
}

export default Vue.extend({
  data(): IProps {
    return {
      tab: null,
      disabled: true,
      books: [],
      error: 0,
      loading: true,
      search: '',
    };
  },
  async created() {
    try {
      this.loading = true;
      const { data } = await axios.get('/api/v1/books');
      this.books = data.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = 1;
    }
  },
  components: {
    Card,
    Loader,
  },
  methods: {
    removeBook(id: number) {
      this.books = this.books.filter((e) => e.id !== id);
    },
  },
});
</script>

<style>
.test {
  height: 755px;
  overflow: auto;
  box-shadow: none;
}
</style>
