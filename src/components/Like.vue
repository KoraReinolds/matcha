<template>
  <font-awesome-icon
    :class="[
      'icon',
      'like',
      `fa-${size}x`,
      {
        active,
      }
    ]"
    :style="{
      cursor: disabled === '' ? 'default' : 'pointer',
    }"
    icon="heart"
    @click="disabled !== '' && like(user)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Like',
  data: () => ({
  }),
  props: ['size', 'user', 'active', 'disabled'],
  computed: {
    ...mapGetters({
      myLikeList: 'users/MY_LIKES',
    }),
  },
  methods: {
    ...mapActions({
      like: 'users/LIKE',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.like {
  transition: all 0.2s;
  color: lightgray;
  cursor: pointer;
  &.active {
    color: rgba($color: $like-color, $alpha: 1.0);
  }
}
</style>
