<template>
  <div
    class="short-list"
  >
    <!-- <transition-group
      name="list"
      tag="p"
    > -->
    <template
      v-if="myLikeList && historyList && this.$route.name==='history'"
    >
      <UserShort
        v-for="(userId, index) in historyList"
        :key="'history'+index+userId"
        :user="users[userId]"
      />
    </template>

    <template
      v-else-if="visitorLikeList && visitorList && this.$route.name==='visitors'"
    >
      <UserShort
        v-for="(userId, index) in visitorList"
        :key="'visitors'+index+userId"
        :user="users[userId]"
      />
    </template>

    <template
      v-else-if="notifications && this.$route.name==='notifications'"
    >
      <UserShort
        v-for="(notification, index) in notifications"
        :key="'notifications'+index+notification.id"
        :user="users[notification.id]"
        :notification="notification"
      >
      </UserShort>
    </template>
    <!-- </transition-group> -->
  </div>

</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import UserShort from '@/components/UserShort.vue';
import iconsMixin from '@/mixins/iconMixin';

export default {
  name: 'history',
  mixins: [iconsMixin],
  components: {
    UserShort,
  },
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
      user: 'user/USER',
      users: 'tools/ETHALON',
      notifications: 'msg/GET_ALL_NOTIFICATIONS',
      visitorLikeList: 'users/VISITOR_LIKES',
      myLikeList: 'users/MY_LIKES',
      visitorList: 'users/VISITORS',
      historyList: 'users/HISTORY',
    }),
  },
  methods: {
    ...mapMutations({
      chatWIthUser: 'users/SET_CUR_CHAT_USER_ID',
    }),
    ...mapActions({
      getUsers: 'users/GET_USERS',
    }),
  },
  mounted() {
  },
};
</script>
<style scoped lang="scss">
@import '@/assets/style.scss';

.short-list {
  padding: 50px 10px;
}


.list-enter-active {
  transition: all 0.5s;
  transition-delay: 0.5s;
}

.list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.list-move {
  transition: transform 0.5s;
}

</style>
