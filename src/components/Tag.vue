<template>
  <span
    class="tag"
  >
    {{ name }}
    <font-awesome-icon
      class="close"
      @click="$emit('click', $event)"
      icon="times-circle"
    />
  </span>
</template>

<script>
export default {
  name: 'Tag',
  data: () => ({
  }),
  props: ['name'],
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.tag {
  position: relative;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0px 8px 0px 15px;
  font-weight: bold;
  background-color: white;
  border-radius: 15px;
  background: $main-color;
  color: white;
  .close {
    cursor: pointer;
  }
}
</style>
