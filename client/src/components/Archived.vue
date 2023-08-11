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
      @input="filterBooks"
      :disabled="(!books.length && !search) || (!books.length && !search)"
    ></v-text-field>
    <v-container>
      <Loader v-if="contentLoading" />
      <v-row v-else-if="!books.length">You have no archived books ...</v-row>
      <v-row v-else>
        <v-col v-for="book in books" :key="book.id" cols="4">
          <Card :data="book" :removeBook="removeBook" :type="'delete'" />
        </v-col>
      </v-row>
    </v-container>
    <v-pagination
      v-model="page"
      :length="Math.ceil(count / 6)"
      rounded="circle"
      @input="filterBooks"
      v-if="count && !contentLoading"
      :disabled="contentLoading"
    ></v-pagination>
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
  contentLoading: boolean;
  category: string;
  count: number;
  page: number;
  timeoutId: number | null;
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
      contentLoading: false,
      category: 'All',
      count: 0,
      page: 1,
      timeoutId: null,
      search: '',
    };
  },
  async created() {
    try {
      this.loading = true;
      const { data } = await axios.get(
        '/api/v1/books?paranoid=false&deleted=true'
      );
      this.books = data.data.rows;
      this.count = data.data.count;
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
    filterBooks() {
      this.contentLoading = true;

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.fetchData();
      }, 2000);
    },
    async fetchData() {
      try {
        const { data } = await axios.get(
          `/api/v1/books/filter?title=${this.search}&category=All&page=${this.page}&paranoid=false&deleted=true`
        );
        this.contentLoading = false;
        this.books = data.data.rows;
        this.count = data.data.count;
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
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
