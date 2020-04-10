import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import userModule from './modules/user';
import usersModule from './modules/users';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobile: window.innerWidth <= 480,
  },
  getters: {
    IS_MOBILE: (state) => state.mobile,
  },
  mutations: {
    RESIZE: (state) => {
      state.mobile = window.innerWidth <= 480;
    },
  },
  actions: {
  },
  modules: {
    auth: authModule,
    user: userModule,
    users: usersModule,
  },
});
