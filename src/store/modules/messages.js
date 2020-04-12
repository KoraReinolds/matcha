// import API from '@/mockAPI/userGenerator';

export default {
  namespaced: true,
  state: {
    messages: [],
    allNotifications: [],
  },
  getters: {
    GET: (state) => state.messages,
    GET_ALL_NOTIFICATIONS: (state) => state.allNotifications,
  },
  mutations: {
    SET_MESSAGE: (state, message) => {
      state.messages.push(message);
      setTimeout(() => { state.messages = []; }, 3000);
    },
    SET_NOTIFICATION: (state, { who, status }) => {
      who.forEach((userId) => {
        const user = state.allNotifications.find((notif) => notif.id === userId);
        if (user) {
          if (!user.actions.includes(status)) user.actions.push(status);
        } else {
          state.allNotifications.unshift({
            id: userId,
            actions: [status],
          });
        }
      });
    },
  },
  actions: {
    // GET_NOTIFICATIONS: ({ commit, rootGetters }) => {
    //   if (rootGetters.USER) {
    //     API.getNotifications().then((messages) => {
    //       messages.forEach(({ status, who }) => {
    //         if (status === 'message') {
    //           const usersId = who.map((user) => +user.id);
    //           commit('SET_NOTIFICATION', { who: usersId, status });
    //           commit('users/SEND_ME_MESSAGE', who, { root: true });
    //           commit('SET_MESSAGE', {
    //             status,
    //             text: `You have ${Object.keys(who).length} new message${(Object.keys(who).length) ? 's' : ''}`,
    //           });
    //         } else if (status === 'like' && who.length) {
    //           commit('SET_NOTIFICATION', { who, status });
    //           commit('users/LIKE_ME', who, { root: true });
    //           commit('SET_MESSAGE', {
    //             status,
    //             text: `You have ${who.length} new like${(who.length - 1) ? 's' : ''}`,
    //           });
    //         } else if (status === 'dislike' && who.length) {
    //           commit('SET_NOTIFICATION', { who, status });
    //           commit('users/DISLIKE_ME', who, { root: true });
    //           commit('SET_MESSAGE', {
    //             status,
    //             text: `You have ${who.length} dislike${(who.length - 1) ? 's' : ''}`,
    //           });
    //         } else if (status === 'visit' && who.length) {
    //           commit('SET_NOTIFICATION', { who, status });
    //           commit('users/VISIT_ME', who, { root: true });
    //           commit('SET_MESSAGE', {
    //             status,
    //             text: `You visit ${who.length} people${(who.length - 1) ? 's' : ''}`,
    //           });
    //         }
    //       });
    //     });
    //   }
    // },
  },
};
