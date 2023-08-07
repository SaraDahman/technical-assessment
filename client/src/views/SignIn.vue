<template>
  <v-app class="px-10 py-10">
    <h2 class="greeting">Welcome Back</h2>
    <v-form
      ref="registerForm"
      v-model="valid"
      lazy-validation
      class="px-10 py-10 registerForm"
    >
      <v-row>
        <v-col cols="12">
          <h3>Sign In</h3>
        </v-col>
      </v-row>
      <v-row>
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
            append-icon="mdi-eye"
            >Sign in</v-btn
          >
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <p>You Don't have an account?</p>
          <router-link to="/" tag="button" class="">Sign Up</router-link>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { mapMutations, mapGetters } from 'vuex';
import '../styles/forms.css';

export default Vue.extend({
  data() {
    return {
      loading: false,
      valid: true,
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
    };
  },
  created() {
    if (this.user) this.$router.push('/dashboard');
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapMutations(['setUser']),
    async validate() {
      const signInForm = (
        this.$refs.registerForm as Vue & {
          validate: () => boolean;
        }
      ).validate();

      if (signInForm) {
        this.signIn();
      }
    },

    async signIn() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        this.loading = true;
        const { data } = await axios.post('/api/v1/auth/signIn', userData);
        this.$toast.success(data.message);
        this.setUser(data.user);
        this.loading = false;
        this.$router.push('/dashboard');
      } catch (error: any) {
        this.$toast.error(error.response.data.message);
        this.loading = false;
      }
    },
  },
});
</script>
