<template>
  <img
    @click="$emit('click', $event)"
    @error="error = true"
    :style="{
      width: width ? width : '100%',
      height: height ? height : '100%',
      borderRadius: rounded || rounded === '' ? '50%' : '',
    }"
    :src="error ? '/img/not_found_user.d3401409.jpg' : src"
  />
</template>

<script>

export default {
  name: 'CustomImage',
  props: ['src', 'width', 'height', 'rounded'],
  data: () => ({
    error: false,
  }),
  watch: {
    pictures() {
      this.status = 'pending';
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

img {
  object-fit: cover;
}

</style>
