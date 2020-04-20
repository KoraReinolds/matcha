<template>
  <div
    v-if="user && users"
    id="main"
  >
    <div
      class="user_list"
    >
      <template
        v-if="users.length"
      >
        <transition-group
          tag="p"
          name="user"
        >
          <User
            v-for="(user, index) in renderUsers"
            :key="user.id"
            :user="{...user, index: index}"
          />
        </transition-group>
      </template>
      <template
        v-else
      >
        <div
          class="else"
        >
          Search returned no results
        </div>
      </template>
      <Paginator
        class="paginator"
      />
    </div>
    <Tools
      class="tools"
    />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import User from '@/components/User.vue';
import Tools from '@/views/Tools.vue';
import Paginator from '@/components/Paginator.vue';

export default {
  name: 'userList',
  components: {
    User,
    Tools,
    Paginator,
  },
  computed: {
    ...mapGetters({
      user: 'user/USER',
      users: 'tools/USERS',
      renderUsers: 'tools/RENDER_USERS',
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

#main {
  display: flex;
  padding: 50px 0;
  .user_list {
    position: relative;
    width: 850px;
    height: 1000px;
    overflow: hidden;
  }
  .tools {
    cursor: pointer;
    @media (max-width: 480px) {
      position: fixed;
      left: 10px;
      top: 60px;
    }
    @media (min-width: 480px) {
    }
  }
  .else {
    padding: 30px;
  }
  .paginator {
    position: absolute;
    bottom: 0;
  }
}
</style>
