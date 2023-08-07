import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: true,
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
    },
    actions: {
        async fetchUser({ commit }) {
            try {
                commit('setLoading', true);
                const { data } = await axios.get('/api/v1/auth/me');
                commit('setUser', data.data);
                commit('setLoading', false);
            } catch (error) {
                commit('setUser', null);
                commit('setLoading', false);
            }
        },
    },
    getters: {
        user: state => state.user,
        loading: state => state.loading,
    },
});
