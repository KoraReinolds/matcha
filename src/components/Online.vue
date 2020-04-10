<template>
  <span
    class="time"
  >
    {{ ((Date.now() - time) / 1000 > 60) ? getTime() : 'Online' }}
  </span>
</template>

<script>
export default {
  name: 'Online',
  data: () => ({
  }),
  props: ['time'],
  methods: {
    getTime() {
      const minutes = Math.floor((Date.now() - this.user.time) / 1000 / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
      if (years) return `was online ${years} years ago`;
      if (months) return `was online ${months} months ago`;
      if (days) return `was online ${days} days ago`;
      if (hours) return `was online ${hours} hours ago`;
      if (minutes) return `was online ${minutes} minutes ago`;
      return 'not online now';
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.time {
  color: rgb(161, 161, 161);
  font-size: 14px;
}

</style>
