import API from '@/mockAPI/userGenerator';
import { Date } from 'core-js';

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
    CLOSE_MSG: (state, index) => {
      state.messages.splice(index, 1);
    },
    SET_MESSAGE: (state, message) => {
      const newMsg = {
        ...message,
        visible: true,
      };
      state.messages.push(newMsg);
      setTimeout(() => { newMsg.visible = false; }, 5000);
    },
    SET_NOTIFICATION: (state, { id, action }) => {
      state.allNotifications.unshift({
        id,
        action,
        time: Date.now(),
      });
    },
  },
  actions: {
    GET_NOTIFICATIONS: ({ commit, rootGetters }) => {
      if (rootGetters['user/USER']) {
        API.getNotifications().then((messages) => {
          messages.forEach(({ action, id, text }) => {
            const user = rootGetters['users/USERS'][id];
            if (action === 'messages') {
              commit('SET_NOTIFICATION', { id, action });
              commit('chat/SEND_ME_MESSAGE', { id, text }, { root: true });
              commit('SET_MESSAGE', {
                status: action,
                text: `${user.firstName} ${user.lastName} send you a message`,
              });
            } else if (action === 'like') {
              commit('SET_NOTIFICATION', { id, action });
              commit('users/LIKE_ME', id, { root: true });
              if (rootGetters['users/MY_LIKES'].includes(user.id)
                && rootGetters['users/VISITOR_LIKES'].includes(user.id)) {
                commit('chat/ADD_TO_CHAT', user.id, { root: true });
              } else {
                commit('chat/REMOVE_FROM_CHAT', user.id, { root: true });
              }
              commit('chat/ADD_TO_CHAT', id, { root: true });
              commit('SET_MESSAGE', {
                status: action,
                text: `${user.firstName} ${user.lastName} liked you`,
              });
            } else if (action === 'dislike') {
              commit('SET_NOTIFICATION', { id, action });
              commit('users/DISLIKE_ME', id, { root: true });
              if (rootGetters['users/MY_LIKES'].includes(user.id)
                && rootGetters['users/VISITOR_LIKES'].includes(user.id)) {
                commit('chat/ADD_TO_CHAT', user.id, { root: true });
              } else {
                commit('chat/REMOVE_FROM_CHAT', user.id, { root: true });
              }
              commit('chat/REMOVE_FROM_CHAT', id, { root: true });
              commit('SET_MESSAGE', {
                status: action,
                text: `${user.firstName} ${user.lastName} disliked you`,
              });
            } else if (action === 'visit') {
              commit('SET_NOTIFICATION', { id, action });
              commit('users/VISIT_ME', id, { root: true });
              commit('SET_MESSAGE', {
                status: action,
                text: `${user.firstName} ${user.lastName} visited you`,
              });
            }
          });
        });
      }
    },
  },
};
