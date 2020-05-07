<template>
  <div id="not_found">
    <h3>
      Page not found
    </h3>
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

#not_found {
  h3 {
    margin-top: 10%;
    text-align: center;
  }
}

</style>
