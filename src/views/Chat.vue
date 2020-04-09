<template>
  <div id="chat">
    <h1>chat page</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'chat',
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
