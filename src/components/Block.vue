<template>
  <font-awesome-icon
    :class="[
      'icon',
      'block',
      `fa-${size}x`,
    ]"
    icon="user-slash"
    @click="block(user)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Block',
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
      block: 'users/BLOCK',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.block {
  transition: all 0.2s;
  cursor: pointer;
  &.active {
    color: $block-color;
  }
}
</style>
