import API from '@/mockAPI/userGenerator';

export default {
  namespaced: true,
  state: {
    chatList: null,
    curChatUserId: null,
  },
  getters: {
    CHAT_MESSAGES: (state) => (state.curChatUserId
      ? state.chatList[state.curChatUserId].messages : ''),
    CUR_CHAT_USER: (state) => state.curChatUserId,
    CHAT_LIST: (state) => state.chatList,
  },
  mutations: {
    ADD_TO_CHAT: (state, id) => {
      state.chatList[id] = { messages: {} };
      state.chatList = { ...state.chatList };
    },
    REMOVE_FROM_CHAT: (state, id) => {
      delete state.chatList[id];
      state.chatList = { ...state.chatList };
    },
    SET_CUR_CHAT_USER_ID: (state, id) => {
      state.curChatUserId = id;
    },
    SEND_ME_MESSAGE: (state, { id, text }) => {
      state.chatList[id].messages.push({
        text,
        from: false,
      });
    },
    SET_CHANGE_MARK: (state, users) => {
      users.forEach((userId) => { state.users[userId].changes = true; });
    },
    SET_MESSAGE: (state, message) => {
      state.chatList[state.curChatUserId].messages.push({
        text: message.replace(/\n/g, '<br />'),
        from: true,
      });
    },
    SET_CHAT: (state, { chatList }) => {
      state.chatList = chatList;
    },
  },
  actions: {
    SEND_MESSAGE: ({ commit }, msg) => {
      API.sendMessage(msg).then(() => {
        commit('SET_MESSAGE', msg);
      });
    },
  },
};
