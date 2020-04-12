<template>
  <div
    class="short-list"
  >
    <transition-group
      name="list"
      tag="p"
    >
    <template
      v-if="myLikeList && historyList && this.$route.name==='history'"
    >
      <UserShort
        v-for="userId in historyList"
        :key="'history'+userId"
        :user="users[userId]"
      >
      </UserShort>
    </template>

    <template
      v-else-if="visitorLikeList && visitorList && this.$route.name==='visitors'"
    >
      <UserShort
        v-for="userId in visitorList"
        :key="'visitors'+userId"
        :user="users[userId]"
      >
      </UserShort>
    </template>

    <template
      v-else-if="notifications && this.$route.name==='notifications'"
    >
      <UserShort
        v-for="notification in notifications"
        :key="'notifications'+notification.id"
        :user="users[notification.id]"
      >
      </UserShort>
    </template>
    </transition-group>
  </div>

  <!-- <div
    class="short-list"
    v-else-if="notifications && this.$route.name==='notifications'"
  >
    <transition-group
      name="list"
      tag="p"
    >
      <UserShort
        v-for="notification in notifications"
        :key="'notif'+notification.id"
        :user="users[notification.id]"
      >
        <div
          class="icons"
        >
          <font-awesome-icon v-for="act in notification.actions"
            :size="`${mobile ? 2 : 3}x`"
            :key="'action'+act+notification.id"
            :class="['icon', 'active', act, `${icons[act]}_color`]" :icon="icons[act]" />
        </div>
      </UserShort>
    </transition-group>
  </div> -->

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
