<template>
  <font-awesome-icon
    :class="[
      'icon',
      'ban',
      `fa-${size}x`,
    ]"
    icon="ban"
    @click="ban(user.id)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ban',
  data: () => ({
  }),
  props: ['size'],
  computed: {
    ...mapGetters({
      user: 'users/CURRENT_USER',
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
  &:hover,
  &.active {
    color: $font-color;
  }
}
</style>
