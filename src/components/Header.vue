<template>
  <header :class="{ fill: !user }">
    <div
      v-if="user"
      class="nav"
    >
      <div
        v-if="user.informationFilled"
        class="only_laptop"
      >
        <router-link
          class="link"
          :to="{ path: `/user/${user.id}` }"
        >
          My page
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'main' }"
        >
          Search
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'history' }"
        >
          History
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'visitors' }"
        >
          Visitors
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'chat' }"
        >
          Chat
        </router-link>
      </div>
      <router-link
        class="link notif"
        :to="{ name: 'notifications' }"
      >
      <font-awesome-layers
        class="icon"
      >
        <font-awesome-icon icon="bell"/>
        <span
          v-if="curLen(notifications, 'notifications')"
          :class="[
            'fa-layers-counter',
            `counter fa-${ mobile ? 2 : 3 }x`,
          ]"
        >
          {{ curLen(notifications, 'notifications') }}
        </span>
      </font-awesome-layers>
      </router-link>
      <router-link
        class="link"
        :to="{ name: 'settings' }"
      >
        <font-awesome-icon
          :class="['icon']"
          icon="cogs"
        />
      </router-link>
      <a
        class="link"
        @click="logout"
      >
        <font-awesome-icon
          :class="['icon']"
          icon="sign-out-alt"
        />
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'app',
  data: () => ({
    startLen: 0,
  }),
  components: {
  },
  computed: {
    ...mapGetters({
      user: 'user/USER',
      notifications: 'msg/GET_ALL_NOTIFICATIONS',
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    curLen(list, path) {
      const len = list.length || list.keys().length;
      if (this.$route.path === `/${path}`) {
        this.startLen = len;
      }
      return len - this.startLen;
    },
    ...mapMutations({
    }),
    ...mapActions({
      logout: 'auth/LOGOUT',
    }),
  },
  mounted() {
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

header {
  top: 0;
  left: 0;
  position: fixed;
  @media (max-width: $mobile-breakpoint) {
    height: 30px;
    line-height: 30px;
  }
  height: 80px;
  line-height: 80px;
  width: 100%;
  background-color: $main-color;
  z-index: 4;
  transition: height 0.5s;
  box-shadow: inset 0 -5px 20px $main-color-shadow;
  .nav {
    display: flex;
    align-items: center;
    font-family: 'Do Hyeon', sans-serif;
    max-width: $wrapper-width;
    margin: 0 auto;
    padding: 0 $padding_content;
    .link {
      font-weight: bold;
      text-decoration: none;
      color: white;
      height: inherit;
      line-height: inherit;
      text-align: center;
      position: relative;
      margin-right: 20px;
      &.notif {
        margin-left: auto;
      }
      &:last-child {
        margin: 0;
      }
    }
    .counter {
      right: 15px;
      top: 0px;
    }
  }
  &.fill {
    z-index: -1;
    height: 100%;
  }
}

</style>
