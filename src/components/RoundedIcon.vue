<template>

  <font-awesome-layers
    v-if="!mask"
    :class="[
      'rounded-icon',
      `fa-${size}x`,
    ]"
    @click="$emit('click', $event)"
  >
    <font-awesome-icon
      class="circle"
      icon="circle"
      :style="{ borderRadius: `${8 * size}px` }"
    />
    <font-awesome-icon
      :class="[
        'inner-icon',
        `${icon}_color`
      ]"
      :icon="icons[icon] ? icons[icon] : icon"
      :transform="`shrink-5`"
    />
  </font-awesome-layers>

  <font-awesome-icon
    v-else
    :icon="icons[icon] ? icons[icon] : icon"
    :class="[
      `${icon}_color`,
    ]"
    @click="$emit('click', $event)"
    transform="shrink-5"
    mask="circle"
    :size="`${size}x`"
  />
</template>

<script>
import iconsMixin from '../mixins/iconMixin';

export default {
  name: 'roundIcon',
  props: ['icon', 'size', 'mask'],
  mixins: [iconsMixin],
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.rounded-icon {
  .circle {
    color: white;
    box-shadow: 0 0 10px lightgrey;
  }
}
</style>
