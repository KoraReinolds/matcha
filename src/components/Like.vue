<template>
  <font-awesome-icon
    :class="[
      'icon',
      'like',
      `fa-${size}x`,
      {
        active: myLikeList.includes(user.id)
      }
    ]"
    icon="heart"
    @click="like(user)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Like',
  data: () => ({
  }),
  props: ['size'],
  computed: {
    ...mapGetters({
      user: 'users/CURRENT_USER',
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
  cursor: pointer;
  &.active {
    color: rgba($color: $like-color, $alpha: 1.0);
  }
}
</style>
