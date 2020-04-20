<template>
  <router-link
    :to="{ path: `/chat` }"
  >
    <div
      class="btn"
      @click="chatWIthUser(user.id)"
    >
      Join to chat
    </div>
  </router-link>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChatLink',
  data: () => ({
    closeButton: null,
  }),
  props: ['user'],
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
      chatWIthUser: 'chat/SET_CUR_CHAT_USER_ID',
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

a .btn {
  text-align: center !important;
  width: 100%;
}
</style>
