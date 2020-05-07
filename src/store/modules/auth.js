import API from '@/mockAPI/userGenerator';
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
    SIGN_IN({ commit }) {
      API.login().then((data) => {
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
      });
    },
  },
};
