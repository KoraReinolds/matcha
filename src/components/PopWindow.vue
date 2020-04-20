<template>
    <div
      v-if="messages"
      :class="[
        'notifications',
        'only_laptop',
      ]"
    >
      <transition-group
        name="notification"
        tag="p"
      >
        <div
          v-for="(message, index) in messages"
          :key="'message'+index"
          :class="[
            'mess',
            `${message.status}_bg`,
            `${message.status}_border`,
          ]"
          :style="{
            display: message.visible ? 'block' : 'none',
          }"
        >
          <font-awesome-icon
            :class="[
              'close',
            ]"
            @click="closeMessage(index)"
            icon="times"
          />
          <font-awesome-icon
            :class="[
              'icon',
              'fa-2x',
              `${message.status}_color`,
              message.status
            ]"
            :icon="icons[message.status]"
          />
          {{ message.text }}
        </div>
      </transition-group>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import iconsMixin from '@/mixins/iconMixin';

export default {
  name: 'PopWindow',
  props: ['icon'],
  mixins: [iconsMixin],
  computed: {
    ...mapGetters({
      messages: 'msg/GET',
    }),
  },
  methods: {
    ...mapMutations({
      closeMessage: 'msg/CLOSE_MSG',
    }),
    ...mapActions({
      getNotifications: 'msg/GET_NOTIFICATIONS',
    }),
  },
  mounted() {
    setTimeout(() => this.getNotifications(), 1000);
    setInterval(() => this.getNotifications(), 99000);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
@media (min-width: $mobile-breakpoint) {
  .notifications {
    position: fixed;
    right: 5%;
    bottom: 10%;
    display: flex;
    flex-direction: column-reverse;
    z-index: 10;
    .mess {
      position: relative;
      color: white;
      background: linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      );
      display: flex;
      align-items: center;
      margin: 10px 0;
      border-radius: 20px 20px 0px 20px;
      padding: 20px 40px 20px 20px;
      .close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
