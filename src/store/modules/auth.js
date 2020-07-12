import API from '@/mockAPI/api';
// import API from '@/mockAPI/userGenerator';
import router from '@/router';

export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    LOGOUT({ commit }) {
      router.push({ name: 'login' });
      commit('user/REMOVE_USER', null, { root: true });
      localStorage.removeItem('user');
    },
    REGISTER({ commit }, info) {
      API.register(info).then((data) => {
        if (data.type === 'ok') {
          localStorage.setItem('user', data.token);
          commit('user/SET_USER', data.user, { root: true });
          commit('users/SET_USERS', data, { root: true });
          commit('tools/SET_SEARCH_PARAMS', data.user, { root: true });
          commit('tools/SET_USERS', data, { root: true });
          commit('tools/FILTER_USERS', null, { root: true });
          commit('chat/SET_CHAT', data, { root: true });
          if (data.user.informationFilled) {
            router.push({ path: `/user/${data.user.id}` });
          } else {
            router.push({ name: 'settings' });
          }
        } else if (data.type === 'error') {
          commit('msg/SET_MESSAGE', {
            status: 'error',
            text: 'The error ocure on the server. Try later.',
          }, { root: true });
        }
      });
    },
    SIGN_IN({ commit }, info) {
      API.login(info).then(({ type, token, message }) => {
        if (type === 'ok') {
          localStorage.setItem('user', token);
          API.profileGet({ activationCode: token })
            .then((req) => {
              if (req.type === 'ok') {
                console.log(JSON.parse(req.data));
                commit('user/SET_USER', JSON.parse(req.data), { root: true });
                router.push({ name: 'settings' });
              } else if (req.type === 'error') {
                commit('msg/SET_MESSAGE', {
                  status: 'error',
                  text: req.message,
                }, { root: true });
              }
            });
          // commit('users/SET_USERS', data, { root: true });
          // commit('tools/SET_SEARCH_PARAMS', data.user, { root: true });
          // commit('tools/SET_USERS', data, { root: true });
          // commit('tools/FILTER_USERS', null, { root: true });
          // commit('chat/SET_CHAT', data, { root: true });
          // if (data.user.informationFilled) {
          //   router.push({ path: `/user/${data.user.id}` });
          // } else {
          //   router.push({ name: 'settings' });
          // }
        } else if (type === 'error') {
          commit('msg/SET_MESSAGE', {
            status: 'error',
            text: message,
          }, { root: true });
        }
      });
    },
  },
};
