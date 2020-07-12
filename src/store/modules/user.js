// import API from '@/mockAPI/userGenerator';
import API from '@/mockAPI/api';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    USER: (state) => state.user,
    LAST_NAME: (state) => (state.user ? state.user.lname : ''),
    FIRST_NAME: (state) => (state.user ? state.user.fname : ''),
    AGE: (state) => (state.user ? state.user.age : ''),
    MAIL: (state) => (state.user ? state.user.email : ''),
    GENDER: (state) => (state.user ? state.user.gender : ''),
    PREFERENCES: (state) => (state.user ? state.user.preference : ''),
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
    SAVE_CHANGES(changes) {
      console.log(changes);
      API.profileUpdate(changes).then((data) => {
        if (data.status === 'ok') {
          console.log('ok');
        }
      });
    },
    GET_USERS({ commit }) {
      const token = localStorage.getItem('user');
      API.profileGet({ activationCode: token })
        .then((req) => {
          console.log(req);
          if (req.type === 'ok') {
            commit('user/SET_USER', JSON.parse(req.data), { root: true });
          } else if (req.type === 'error') {
            commit('msg/SET_MESSAGE', {
              status: 'error',
              text: req.message,
            }, { root: true });
          }
        });
      // API.login().then((data) => {
      //   localStorage.setItem('user', data.token);
      //   commit('user/SET_USER', data.user, { root: true });
      //   commit('users/SET_USERS', data, { root: true });
      //   commit('tools/SET_SEARCH_PARAMS', data.user, { root: true });
      //   commit('tools/SET_USERS', data, { root: true });
      //   commit('tools/FILTER_USERS', null, { root: true });
      //   commit('chat/SET_CHAT', data, { root: true });
      // });
    },
  },
};
