<template>
  <img
    @click="$emit('click', $event)"
    :style="{
      width: width ? width : '100%',
      height: height ? height : '100%',
      borderRadius: rounded === '' ? '50%' : '',
    }"
    :src="src"
  />
    <!-- src="@/assets/images/not_found_user.jpg" -->
</template>

<script>

export default {
  name: 'CustomImage',
  props: ['src', 'width', 'height', 'rounded'],
  data: () => ({
    status: 'pending',
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
