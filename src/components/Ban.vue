<template>
  <font-awesome-icon
    :class="[
      'icon',
      'ban',
      `fa-${size}x`,
    ]"
    icon="ban"
    @click="ban(user)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ban',
  data: () => ({
  }),
  props: ['size', 'user'],
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      ban: 'users/BAN',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.ban {
  transition: all 0.2s;
  cursor: pointer;
  &.active {
    color: $ban-color;
  }
}
</style>
