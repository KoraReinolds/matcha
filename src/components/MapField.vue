<template>
  <div
    :class="[
      'map-field',
    ]"
  >
    <span
      :class="[
        'title',
        'left',
      ]"
    >
      {{ label }}
    </span>

    <yandex-map
      v-if="value"
      class="map"
      :settings="settings"
      :coords="value"
      @click="$emit('click', $event)"
      zoom="15"
      :cluster-options="{
        1: {clusterDisableClickZoom: true}
      }"
      :behaviors="['drag', 'scrollZoom']"
      :controls="[]"
    >
    <ymap-marker
      markerId="1"
      marker-type="placemark"
      :coords="value"
      hint-content="Your markplace"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      cluster-name="1"
    />
    </yandex-map>

  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
  name: 'MapField',
  data: () => ({
    settings: {
      apiKey: '',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1',
    },
  }),
  props: ['label', 'value'],
  components: {
    yandexMap,
    ymapMarker,
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.map-field {
  .map {
    padding: 10px 0;
    width: 100%;
    height: 500px;
  }
}
</style>
