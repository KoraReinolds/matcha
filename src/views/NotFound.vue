<template>
  <div id="not_found">
    <h1>not_found page</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'not_found',
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
