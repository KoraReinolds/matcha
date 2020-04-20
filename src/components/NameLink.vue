<template>
  <span
    class="name"
  >
    <router-link
      :to="{ path: `/user/${user.id}` }"
    >
      {{`${user.firstName} ${user.lastName} `}}
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'NameLink',
  data: () => ({
  }),
  props: ['user'],
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.name {
  font-family: 'Lobster', cursive;
  a {
    text-decoration: none;
    color: $font-color;
    font-size: 20px;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>
