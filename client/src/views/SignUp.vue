<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import '../styles/forms.css';

export default Vue.extend({
  data: () => ({
    loading: false,
    valid: true,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    show: false,

    rules: {
      required: (value: string) => !!value || 'Required',
      isEmail: (value: string) =>
        /.+@.+\..+/.test(value) || 'E-mail must be valid',
      password: (value: string) =>
        (value && value.length >= 8) || 'Min 8 characters',
    },
  }),
  methods: {
    async validate() {
      const signUpForm = (
        this.$refs.registerForm as Vue & {
          validate: () => boolean;
        }
      ).validate();

      if (signUpForm) {
        this.signUp();
      }
    },

    async signUp() {
      const userData = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      try {
        this.loading = true;
        const { data } = await axios.post('/api/v1/auth/signUp', userData);
        this.$toast.success(data.message);
        this.loading = false;
      } catch (error: any) {
        this.$toast.error(error.response.data.message);
        this.loading = false;
      }
    },
  },
});
</script>

<template>
  <v-app class="px-10 py-10">
    <h2 class="greeting">Welcome to the website</h2>
    <v-form
      ref="registerForm"
      v-model="valid"
      lazy-validation
      class="px-10 py-10 registerForm"
    >
      <v-row>
        <v-col cols="12">
          <h3>Sign Up</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="firstName"
            :rules="[rules.required]"
            label="First Name"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="lastName"
            :rules="[rules.required]"
            label="Last Name"
            maxlength="20"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.isEmail]"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.password]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-btn
            x-large
            block
            :disabled="loading || !valid"
            :loading="loading"
            color="#4DD0E1"
            @click="validate"
            >Register</v-btn
          >
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <p>Already have an account?</p>
          <router-link to="/signIn" tag="button" class="">Sign in</router-link>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>
