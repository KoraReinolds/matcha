<template>
  <div id="user-list">
    <h1>user-list page</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'user-list',
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
</style>
