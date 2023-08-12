<template>
  <v-sheet class="mx-auto py-10 d-flex flex-column align-center sheet">
    <v-form ref="form" class="registerForm px-10 py-10">
      <v-card width="300" class="mb-10 mx-auto">
        <v-img
          class="d-flex align-center justify-center px-3"
          height="300"
          contain
          :src="imageUrl"
        >
          <template v-slot:placeholder v-if="loading">
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
          <template v-if="!imageUrl && !loading">
            <p>no image was provided</p>
          </template>
        </v-img>
      </v-card>
      <v-file-input
        v-model="image"
        label="Book Cover"
        variant="filled"
        prepend-icon="mdi-camera"
        :rules="rules"
        @change="uploadFile"
      ></v-file-input>
      <v-text-field
        v-model="title"
        :rules="rules"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="author"
        :rules="rules"
        label="Author"
        required
      ></v-text-field>
      <v-textarea
        v-model="description"
        :rules="rules"
        label="Description"
        required
      ></v-textarea>

      <v-select
        v-model="category"
        :items="items"
        :rules="rules"
        label="Category"
        required
      ></v-select>

      <div class="d-flex flex-row justify-start">
        <v-btn
          color="#4DD0E1"
          class="mt-4 mx-4"
          @click="validate"
          x-large
          :loading="loading"
          :disabled="loading"
        >
          Submit
        </v-btn>
        <v-btn color="error" class="mt-4" @click="reset" x-large> Reset </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script lang="ts">
import Vue from 'vue';
import '../styles/forms.css';
import axios from 'axios';
import categories from '@/constants/categoriesList';
import { IAddBook } from '../interfaces/IAddBook';

export default Vue.extend({
  data(): IAddBook {
    return {
      title: '',
      author: '',
      description: '',
      category: '',
      imageUrl: null,
      image: null,
      loading: false,
      rules: [(value: string) => !!value || 'Required'],
      items: categories,
    };
  },
  methods: {
    // to validate the values of the form
    validate() {
      const isValid = (
        this.$refs.form as Vue & {
          validate: () => boolean;
        }
      ).validate();
      if (isValid) {
        this.submitData();
      }
    },
    // to empty the form
    reset() {
      (
        this.$refs.form as Vue & {
          reset: () => void;
        }
      ).reset();
    },
    // upload the image file and receive a link set it to 'imageUrl'
    async uploadFile() {
      try {
        if (this.image) {
          this.loading = true;
          const formData = new FormData();
          formData.append('image', this.image);

          const { data } = await axios.post('/api/v1/upload/image', formData);
          this.imageUrl = data.imageUrl;
          this.loading = false;
        } else {
          this.imageUrl = null;
        }
      } catch (error: any) {
        this.$toast.error(error.response.data.message);
      }
    },

    async submitData() {
      const bookData = {
        title: this.title,
        author: this.author,
        description: this.description,
        category: this.category,
        image: this.imageUrl,
      };

      if (this.loading) this.$toast.warning('wait for the image to load');
      else {
        try {
          this.loading = true;
          const { data } = await axios.post('/api/v1/books', bookData);
          this.loading = false;
          this.reset();
          this.$toast.success(data.message);
          this.$router.push({ name: 'books' });
        } catch (error) {
          this.$toast.error('something went wrong');
          this.loading = false;
        }
      }
    },
  },
});
</script>
<style>
.sheet {
  height: 755px;
  overflow: auto;
}
</style>
