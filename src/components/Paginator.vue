<template>
  <div class="pagination only_laptop" v-if="lastPage !== 1">
    <span class="page first" v-show="currentPage > 2" @click="toFirst">
      {{ 1 }}
    </span>
    <span class="page prev" v-show="currentPage > 1" @click="moveDownPage">
      {{ currentPage - 1 }}
    </span>
    <span class="page cur active" v-show="users.length">
      {{ currentPage }}
    </span>
    <span class="page next" v-show="currentPage < lastPage" @click="moveUpPage">
      {{ currentPage + 1 }}
    </span>
    <span class="page last" v-show="currentPage + 1 < lastPage" @click="toLast">
      {{ lastPage }}
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'paginator',
  computed: {
    ...mapGetters({
      users: 'tools/USERS',
      currentPage: 'tools/CUR_PAGE',
      lastPage: 'tools/LAST_PAGE',
    }),
  },
  methods: {
    ...mapMutations({
      toFirst: 'tools/MOVE_TO_FIRST',
      moveUpPage: 'tools/MOVE_UP_PAGE',
      moveDownPage: 'tools/MOVE_DOWN_PAGE',
      toLast: 'tools/MOVE_TO_LAST',
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

@media (min-width: 480px) {
  .pagination {
    height: 50px;
    width: 100%;
    .page {
      font-size: 20px;
      margin-right: 5px;
      color: #fff;
      display: inline-block;
      border-radius: 5px;
      line-height: 50px;
      text-align: center;
      background-color: $main-color;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    .cur {
      background-color: rgba($color: $main-color, $alpha: 0.5);
    }
  }
}
</style>
