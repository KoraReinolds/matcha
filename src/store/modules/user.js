import API from '@/mockAPI/userGenerator';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    USER: (state) => state.user,
    LAST_NAME: (state) => (state.user ? state.user.lastName : ''),
    FIRST_NAME: (state) => (state.user ? state.user.firstName : ''),
    AGE: (state) => (state.user ? state.user.age : ''),
    MAIL: (state) => (state.user ? state.user.mail : ''),
    GENDER: (state) => (state.user ? state.user.gender : ''),
    PREFERENCES: (state) => (state.user ? state.user.preferences : ''),
    BIOGRAPHY: (state) => (state.user ? state.user.biography : ''),
    TAGS: (state) => (state.user ? state.user.tags : ''),
    IMAGES: (state) => (state.user ? state.user.pictures : ''),
    LOCATION: (state) => (state.user ? state.user.location : ''),
  },
  mutations: {
    REMOVE_USER: (state) => { state.user = null; },
    SET_USER: (state, user) => {
      state.user = user;
      state.user = { ...state.user };
    },
    SET_VALUE: (state, payload) => {
      state.user[payload.key] = payload.val;
    },
  },
  actions: {
    SAVE_CHANGES() {
      API.saveChanges().then((data) => {
        if (data.status === 'ok') {
          console.log('ok');
        }
      });
    },
    GET_USERS({ commit }) {
      API.login().then((data) => {
        localStorage.setItem('user', data.token);
        commit('user/SET_USER', data.user, { root: true });
        commit('users/SET_USERS', data, { root: true });
        commit('tools/SET_SEARCH_PARAMS', data.user, { root: true });
        commit('tools/SET_USERS', data, { root: true });
        commit('tools/FILTER_USERS', null, { root: true });
        commit('chat/SET_CHAT', data, { root: true });
      });
    },
  },
};
