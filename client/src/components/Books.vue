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
      :disabled="
        (!books.length && !search) || (!books.length && !active && !search)
      "
    ></v-text-field>
    <v-tabs
      color="deep-purple accent-4"
      left
      v-model="active"
      @change="filterBooks"
    >
      <v-tab>All</v-tab>
      <v-tab
        v-for="tab in categories"
        :key="tab"
        :disabled="!books.length && !active && !search"
      >
        {{ tab }}
      </v-tab>

      <v-tab-item v-for="n in categories.length + 1" :key="n">
        <v-container>
          <Loader v-if="contentLoading" />
          <v-row v-else-if="!books.length">You have no books ...</v-row>
          <v-row v-else>
            <v-col v-for="book in books" :key="book.id" cols="4">
              <Card :data="book" :removeBook="removeBook" :type="'archive'" />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
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
import categories from '../constants/categoriesList';

interface IProps {
  disabled: boolean;
  books: IBook[];
  error: number;
  tab: null | number;
  loading: boolean;
  search: string;
  active: number;
  categories: string[];
  timeoutId: number | null;
  contentLoading: boolean;
  category: string;
  page: number;
  count: number;
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
      active: 0,
      categories,
      timeoutId: null,
      contentLoading: false,
      category: 'All',
      page: 1,
      count: 0,
    };
  },
  async created() {
    try {
      this.loading = true;
      const { data } = await axios.get(
        '/api/v1/books?paranoid=true&deleted=false'
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
      if (this.active > 0) this.category = this.categories[this.active - 1];
      else this.category = 'All';

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
          `/api/v1/books/filter?title=${this.search}&category=${this.category}&page=${this.page}&paranoid=true&deleted=false`
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
