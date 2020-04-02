export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    USER: (state) => state.user,
  },
  mutations: {
    REMOVE_USER: (state) => { state.user = null; },
    SET_USER: (state, user) => {
      state.user = user;
      state.user = { ...state.user };
    },
  },
  actions: {
  },
};
