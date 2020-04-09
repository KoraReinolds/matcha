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
        if (data.user.informationFilled) {
          router.push({ path: `/user/${data.user.id}` });
        } else {
          router.push({ name: 'settings' });
        }
      });
    },
  },
};
