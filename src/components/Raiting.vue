<template>
  <span
    class="raiting"
  >
    <font-awesome-icon
      class="star"
      icon="star"
      :style="{
        opacity,
      }"
    />
    {{ value }}
  </span>
</template>

<script>
export default {
  name: 'Raiting',
  data: () => ({
    opacity: null,
  }),
  props: ['value'],
  mounted() {
    this.opacity = this.value / 1000 + 0.2;
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.raiting {
  .star {
    color: $main-color;
  }
}
</style>
