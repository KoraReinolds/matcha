<template>
  <div id="history">
    <h1>History page</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'history',
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
