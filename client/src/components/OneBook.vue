<template>
  <Loader v-if="pageLoading || !book" />
  <v-card v-else class="my-10 mx-auto" width="80%">
    <v-row>
      <v-col cols="4">
        <v-img
          class="d-flex align-center justify-center align-end text-white"
          :src="imageUrl"
          contain
          height="100%"
        >
          <template v-if="loading">
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
          <template v-if="!imageUrl && !loading">
            <div class="d-flex align-center justify-center fill-height">
              please select an image
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col cols="8">
        <h2 class="text-capitalize mb-5">Edit Your Book</h2>
        <v-form ref="form">
          <v-file-input
            v-model="imageFile"
            label="Book Cover"
            variant="filled"
            prepend-icon="mdi-camera"
            @change="uploadFile"
          ></v-file-input>
          <v-text-field
            v-model="book.title"
            :rules="rules"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="book.author"
            :rules="rules"
            label="Author"
            required
          ></v-text-field>
          <v-textarea
            v-model="book.description"
            :rules="rules"
            label="Description"
            required
          ></v-textarea>

          <v-select
            v-model="book.category"
            :items="items"
            :rules="rules"
            label="Category"
            required
          ></v-select>

          <div class="d-flex flex-row justify-start">
            <v-btn
              color="#4DD0E1"
              class="mt-4"
              @click="validate"
              x-large
              :loading="loading"
              :disabled="loading"
            >
              Update
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import Loader from './Loader.vue';
import axios from 'axios';
import { IBook } from '@/interfaces/IBook';

export default Vue.extend({
  data(): {
    book: IBook | null;
    loading: boolean;
    pageLoading: boolean;
    items: string[];
    imageFile: any;
    imageUrl: string;
    rules: any[];
  } {
    return {
      book: null,
      imageFile: null,
      imageUrl: '',
      loading: false,
      pageLoading: true,
      rules: [(value: string) => !!value || 'Required'],
      items: [
        'Romance',
        'Comedy',
        'Horror',
        'Fiction',
        'Historical',
        'Scientific',
        'Mystery',
        'Other',
      ],
    };
  },
  components: {
    Loader,
  },
  async created() {
    try {
      const { id } = this.$route.params;
      this.pageLoading = true;
      const { data } = await axios.get(`/api/v1/books/${id}`);
      this.book = data.data;
      this.imageUrl = data.data.image;
      this.pageLoading = false;
    } catch (error: any) {
      this.$toast.error(error.response.data.message);
    }
  },
  methods: {
    validate() {
      const isValid = (
        this.$refs.form as Vue & {
          validate: () => boolean;
        }
      ).validate();
      if (!this.imageUrl) {
        this.$toast.error('No image was provided');
        return;
      }
      if (isValid) {
        this.submitData();
      }
    },
    async uploadFile() {
      try {
        if (this.imageFile) {
          this.loading = true;
          const formData = new FormData();
          formData.append('image', this.imageFile);

          const { data } = await axios.post('/api/v1/upload/image', formData);

          this.imageUrl = data.imageUrl;
          this.loading = false;
        } else {
          this.imageUrl = '';
        }
      } catch (error: any) {
        this.$toast.error(error.response.data.message);
      }
    },
    async submitData() {
      try {
        const updatedData = {
          ...this.book,
          image: this.imageUrl,
        };

        const { id } = this.$route.params;
        this.loading = true;

        const { data } = await axios.put(`/api/v1/books/${id}`, updatedData);

        this.loading = false;
        this.$router.push({ name: 'books' });
        this.$toast.success(data.message);
      } catch (error: any) {
        this.$toast.error(error.response.data.message);
        this.loading = false;
      }
    },
  },
});
</script>
