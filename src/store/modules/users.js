import lib from '@/library/customFunc';
import API from '@/mockAPI/userGenerator';
// import router from '@/router';

export default {
  namespaced: true,
  state: {
    curUserId: null,
    users: null,
    visitorLikeList: null,
    myLikeList: null,
    visitorList: null,
    historyList: null,
  },
  getters: {
    CURRENT_USER: (state) => (state.users ? state.users[state.curUserId] : ''),
    VISITOR_LIKES: (state) => state.visitorLikeList,
    MY_LIKES: (state) => state.myLikeList,
    VISITORS: (state) => state.visitorList,
    HISTORY: (state) => state.historyList,
    USERS: (state) => state.users,
  },
  mutations: {
    VISIT_USER: (state, id) => {
      if (id && !state.historyList.includes(id)) {
        state.historyList.unshift(id);
      }
    },
    SET_CUR_USER_ID: (state, id) => { state.curUserId = id; },
    VISIT_ME: (state, id) => {
      lib.unshiftIfNotExist(state.visitorList, id);
      state.visitorList = [...state.visitorList];
    },
    DISLIKE_ME: (state, id) => {
      lib.unshiftIfNotExist(state.visitorList, id);
      state.visitorList = [...state.visitorList];

      lib.unshiftOrDelete(state.visitorLikeList, id);
      state.visitorLikeList = [...state.visitorLikeList];
    },
    LIKE_ME: (state, id) => {
      state.visitorList = [...state.visitorList];
      lib.unshiftIfNotExist(state.visitorList, id);

      lib.unshiftOrDelete(state.visitorLikeList, id);
      state.visitorLikeList = [...state.visitorLikeList];
    },
    LIKE: (state, user) => {
      lib.unshiftOrDelete(state.myLikeList, user.id);
      state.myLikeList = [...state.myLikeList];
    },
    SET_USERS: (state, {
      userList,
      likeList,
      historyList,
      visitorLikeList,
      visitorList,
    }) => {
      state.users = userList;

      state.myLikeList = [...likeList];
      state.historyList = [...historyList];
      likeList.forEach((user) => {
        if (!state.historyList.includes(user)) state.historyList.push(user);
      });

      state.visitorLikeList = [...visitorLikeList];
      state.visitorList = [...visitorList];
      visitorLikeList.forEach((user) => {
        if (!state.visitorList.includes(user)) state.visitorList.push(user);
      });
    },
  },
  actions: {
    VISIT_USER: ({ commit }, id) => {
      API.visit(id).then(() => {
        commit('VISIT_USER', id);
      });
    },
    BAN: ({ commit }, user) => {
      API.ban(user.id).then(() => {
        commit('msg/SET_MESSAGE', {
          status: 'ban',
          text: `${user.firstName} has been banned`,
        }, { root: true });
      });
    },
    BLOCK: ({ commit }, user) => {
      API.block(user.id).then(() => {
        commit('msg/SET_MESSAGE', {
          status: 'block',
          text: `${user.firstName} has been blocked`,
        }, { root: true });
      });
    },
    LIKE: ({ commit, getters }, user) => {
      API.like(user.id).then(() => {
        commit('LIKE', user);
        if (getters.MY_LIKES.includes(user.id)
          && getters.VISITOR_LIKES.includes(user.id)) {
          commit('chat/ADD_TO_CHAT', user.id, { root: true });
        } else {
          commit('chat/REMOVE_FROM_CHAT', user.id, { root: true });
        }
      });
    },
  },
};
