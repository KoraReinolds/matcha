<template>
  <span
    class="distance"
  >
    <font-awesome-icon
      class="icon"
      icon="location-arrow"
    />
    {{ value }} km
  </span>
</template>

<script>
export default {
  name: 'Distance',
  data: () => ({
  }),
  props: ['value'],
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.distance {
}
</style>
