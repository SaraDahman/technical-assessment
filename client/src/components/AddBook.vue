<template>
  <v-sheet class="mx-auto py-15 d-flex flex-column align-center">
    <v-row>
      <v-col cols="12">
        <h2 class="greeting">Add a book</h2>
      </v-col>
    </v-row>

    <v-form ref="form" class="registerForm px-10 py-10">
      <v-card width="300" class="mb-10 mx-auto">
        <v-img class="align-end text-white" height="300" contain>
          <!-- <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template> -->
        </v-img>
      </v-card>
      <v-file-input
        v-model="image"
        label="Book Cover"
        variant="filled"
        prepend-icon="mdi-camera"
        :rules="rules"
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
      <v-text-field
        v-model="description"
        :rules="rules"
        label="Description"
        required
      ></v-text-field>

      <v-select
        v-model="category"
        :items="items"
        :rules="rules"
        label="Category"
        required
      ></v-select>

      <div class="d-flex flex-row justify-start">
        <v-btn color="#4DD0E1" class="mt-4 mx-4" @click="validate" x-large>
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

export default Vue.extend({
  data() {
    return {
      title: '',
      author: '',
      description: '',
      image: null,
      imageUrl: null,
      url: '',
      rules: [(value: string) => !!value || 'Required'],
      category: null,
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
  methods: {
    validate() {
      const isValid = (
        this.$refs.form as Vue & {
          validate: () => boolean;
        }
      ).validate();
      if (isValid) {
        //will submit the data
      }
    },
    reset() {
      (
        this.$refs.form as Vue & {
          reset: () => void;
        }
      ).reset();
    },
  },
});
</script>
