import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import userModule from './modules/user';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mobile: window.innerWidth <= 480,
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
  },
});
