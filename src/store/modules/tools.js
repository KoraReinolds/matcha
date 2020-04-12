export default {
  namespaced: true,
  state: {
    users: null,
    ethalon: null,
    sortedUsers: null,
    sortOrder: [],
    renderUsers: [],
    tagList: null,
    tools: {
      gender: '',
      pref: [],
      minRate: 0,
      maxRate: 1000,
      minDist: 0,
      maxDist: 10,
      minAge: 55,
      maxAge: 99,
      tags: [],
    },
    countPerPage: window.innerWidth <= 480 ? 1 : 3,
    firstIndex: 0,
  },
  getters: {
    SORT_LIST: (state) => state.sortOrder,
    CUR_PAGE: (state) => state.firstIndex / state.countPerPage + 1,
    LAST_PAGE: (state) => Math.floor((state.users.length - 1) / state.countPerPage) + 1,
    ETHALON: (state) => state.ethalon,
    TOOLS: (state) => state.tools,
    USERS: (state) => state.users,
    RENDER_USERS: (state) => (
      state.users
        ? state.users.slice(
          state.firstIndex, state.firstIndex + state.countPerPage,
        )
        : null),
  },
  mutations: {
    CHANGE_COUNT_PER_PAGE: (state, val) => { state.countPerPage = val; },
    SORT: (state, value) => {
      if (value) {
        const prefixes = {};
        for (let i = value.length - 1; i >= 0; i -= 1) {
          const prefix = value[i].split('_')[0]; // part without '_rev'
          if (prefixes[prefix]) {
            // if prefix had been registred
            // delete prefix from value
            // [age, age_rev, sort]
            // i = 0
            // prefixes = {sort: true, age: true}
            // delete 'age' from value
            value.splice(i, 1);
          } else {
            // reigister first prefix from value
            prefixes[prefix] = true;
          }
        }
        state.sortOrder = value;
      }
      function calcDiff(a, b) {
        function countTags(user) {
          return state.tools.tags.reduce(
            (sum, tag) => sum + state.tagList[tag].includes(user.id), 0,
          );
        }
        const statements = {
          dist(f, s) { return f.dist - s.dist; },
          age(f, s) { return f.age - s.age; },
          rate(f, s) { return f.fameRating - s.fameRating; },
          dist_rev(f, s) { return s.dist - f.dist; },
          age_rev(f, s) { return s.age - f.age; },
          rate_rev(f, s) { return s.fameRating - f.fameRating; },
          tags(f, s) { return countTags(f) - countTags(s); },
          tags_rev(f, s) { return countTags(s) - countTags(f); },
        };
        for (let i = 0; i < state.sortOrder.length; i += 1) {
          const diff = statements[state.sortOrder[i]](a, b);
          if (diff !== 0) return diff;
        }
        return 0;
      }
      if (state.sortOrder.length) {
        state.sortedUsers.sort((a, b) => calcDiff(a, b));
        state.users.sort((a, b) => calcDiff(a, b));
      }
      state.firstIndex = 0;
    },
    FILTER_USERS: (state) => {
      state.users = state.sortedUsers.filter(
        (user) => user.preferences.includes(state.tools.gender)
          && state.tools.pref.includes(user.gender)
          && user.age >= state.tools.minAge && user.age <= state.tools.maxAge
          && user.dist >= state.tools.minDist && user.dist <= state.tools.maxDist
          && user.fameRating >= state.tools.minRate && user.fameRating <= state.tools.maxRate
          && (
            state.tools.tags.length // фильтр по тегам при условии их наличия
              ? state.tools.tags.some((tag) => ( // хотя бы один тег
                state.tagList[tag]
                  ? state.tagList[tag].includes(user.id) // в общем листе тегов
                  : false)) // если тега в общем тег листе нет
              : true),
      );
      state.firstIndex = 0;
    },
    SET_FILTER: (state, { key, val }) => {
      state.tools[key] = val;
    },
    MOVE_TO_LAST: (state) => {
      state.firstIndex = Math.floor((state.users.length - 1) / state.countPerPage)
        * state.countPerPage;
    },
    MOVE_TO_FIRST: (state) => { state.firstIndex = 0; },
    MOVE_UP_PAGE: (state) => {
      state.firstIndex += state.countPerPage;
      state.firstIndex %= state.users.length;
    },
    MOVE_DOWN_PAGE: (state) => {
      state.firstIndex -= state.countPerPage;
      state.firstIndex = state.firstIndex === -1
        ? state.users.length - 1
        : state.firstIndex % state.users.length;
    },
    SET_SEARCH_PARAMS: (state, user) => {
      state.tools.minAge = Math.max((user.age - 10), 18);
      state.tools.maxAge = Math.min((user.age + 10), 99);
      state.tools.tags = user.tags;
      state.tools.gender = user.gender;
      state.tools.pref = user.preferences;
      state.sortOrder = ['tags_rev', 'rate_rev'];
    },
    SET_USERS: (state, users) => {
      state.tagList = users.tagList;
      state.ethalon = users.userList;
      state.sortedUsers = [...users.userList];
      state.users = [...users.userList];
    },
  },
  actions: {
    ADD_TAG({ commit, state }, tag) {
      if (tag && !state.tools.tags.includes(tag)
      && state.tools.tags.length < 10) {
        const newVal = [...state.tools.tags];
        newVal.push(tag);
        commit('SET_FILTER', {
          val: newVal,
          key: 'tags',
        });
        if (state.sortOrder.includes('tags')) commit('TOGGLE_SORT_ORDER');
        commit('FILTER_USERS');
      }
    },
    SET_FILTER: ({ commit }, data) => {
      commit('SET_FILTER', data);
      commit('FILTER_USERS');
    },
  },
};
