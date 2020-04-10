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
    // chatList: null,
    // curChatUserId: null,
  },
  getters: {
    // CHAT_MESSAGES: (state) => (state.curChatUserId
    //   ? state.chatList[state.curChatUserId].messages : ''),
    // CUR_CHAT_USER: (state) => state.curChatUserId,
    CURRENT_USER: (state) => (state.users ? state.users[state.curUserId] : ''),
    // CHAT_LIST: (state) => state.chatList,
    VISITOR_LIKES: (state) => state.visitorLikeList,
    MY_LIKES: (state) => state.myLikeList,
    // VISITORS: (state) => state.visitorList,
    // HISTORY: (state) => state.historyList,
    // USERS: (state) => state.users,
  },
  mutations: {
    // SEND_ME_MESSAGE: (state, idArr) => {
    //   idArr.forEach((message) => {
    //     state.chatList[message.id].messages.push({
    //       text: message.text,
    //       from: false,
    //     });
    //   });
    // },
    // SET_CHANGE_MARK: (state, users) => {
    //   users.forEach((userId) => { state.users[userId].changes = true; });
    // },
    SET_CUR_CHAT_USER_ID: (state, id) => {
      state.curChatUserId = id;
    },
    // SET_MESSAGE: (state, message) => {
    //   state.chatList[state.curChatUserId].messages.push({
    //     text: message, from: 1,
    //   });
    // },
    SET_CUR_USER_ID: (state, id) => { state.curUserId = id; },
    // VISIT_ME: (state, idArr) => {
    //   idArr.forEach((id) => {
    //     lib.unshiftIfNotExist(state.visitorList, id);
    //     state.visitorList = [...state.visitorList];
    //   });
    // },
    // DISLIKE_ME: (state, idArr) => {
    //   idArr.forEach((id) => {
    //     lib.unshiftIfNotExist(state.visitorList, id);
    //     state.visitorList = [...state.visitorList];

    //     lib.unshiftOrDelete(state.visitorLikeList, id);
    //     state.visitorLikeList = [...state.visitorLikeList];

    //     if (state.myLikeList.includes(id)) {
    //       delete state.chatList[id];
    //       state.chatList = { ...state.chatList };
    //     }
    //   });
    // },
    // LIKE_ME: (state, idArr) => {
    //   idArr.forEach((id) => {
    //     state.visitorList = [...state.visitorList];
    //     lib.unshiftIfNotExist(state.visitorList, id);

    //     lib.unshiftOrDelete(state.visitorLikeList, id);
    //     state.visitorLikeList = [...state.visitorLikeList];

    //     if (state.myLikeList.includes(id)) {
    //       state.chatList[id] = {
    //         messages: {},
    //       };
    //       state.chatList = { ...state.chatList };
    //     }
    //   });
    // },
    LIKE: (state, id) => {
      lib.unshiftOrDelete(state.myLikeList, id);
      state.myLikeList = [...state.myLikeList];

      if (state.visitorLikeList.includes(id)) {
        state.chatList[id] = {
          messages: {},
        };
        state.chatList = { ...state.chatList };
      }
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
    BAN: ({ commit }, id) => {
      API.ban(id).then(() => {
      });
    },
    BLOCK: ({ commit }, id) => {
      API.block(id).then(() => {
      });
    },
    LIKE: ({ commit }, id) => {
      API.like(id).then(() => {
        commit('LIKE', id);
      });
    },
  //   SEND_MESSAGE: ({ commit }, value) => {
  //     // API.getUsers(1000).then((users) => {
  //     commit('SET_MESSAGE', value);
  //     // });
  //   },
  },
};
