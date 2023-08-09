<template>
  <v-card style="height: 100vh">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        style="height: 100vh"
        sticky
      >
        <v-list-item class="px-2">
          <v-list-item-avatar color="#ddd">
            {{ user.firstName[0].toUpperCase()
            }}{{ user.lastName[0].toUpperCase() }}
          </v-list-item-avatar>

          <v-list-item-title
            >{{ user.firstName }} {{ user.lastName }}</v-list-item-title
          >

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="navigate(item.path)"
          >
            <v-list-item-icon>
              <v-icon color="#00ACC1">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list dense>
            <v-list-item link :disabled="loading" @click="signOut">
              <v-list-item-icon>
                <v-icon color="#00ACC1">mdi-logout-variant</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>LOG OUT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- <div class="pa-2">
            <v-btn block color="#4DD0E1"> Logout </v-btn>
          </div> -->
        </template>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  data() {
    return {
      drawer: true,
      mini: true,
      loading: false,
      items: [
        {
          title: 'My Books',
          icon: 'mdi-book-open-page-variant',
          value: 'Books',
          path: 'books',
        },
        {
          title: 'Add a Book',
          icon: 'mdi-pen-plus',
          value: 'add book',
          path: 'add-book',
        },
        {
          title: 'Archived Books',
          icon: 'mdi-delete',
          value: 'users',
          path: 'archived',
        },
      ],
    };
  },
  created() {
    if (!this.user) this.$router.push('/');
  },
  methods: {
    ...mapMutations(['setUser']),

    async navigate(path: string) {
      try {
        await this.$router.push({ name: path });
      } catch (error) {
        this.$toast('already in this page');
      }
    },

    async signOut() {
      try {
        this.loading = true;
        await axios.delete('/api/v1/auth/signOut');
        this.$toast.success('See You Later');
        this.setUser(null);
        this.$router.push('/');
      } catch (error) {
        this.$toast.error('Something went wrong');
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
});
</script>
