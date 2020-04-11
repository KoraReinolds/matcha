<template>
    <div
      v-if="messages"
      :class="[
        'messages',
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
        >
          <font-awesome-icon
            :class="[
              'icon',
              `${icons[message.status]}_color`,
              'active',
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
import { mapGetters, mapActions } from 'vuex';
import iconsMixin from '@/mixins/iconMixin';

export default {
  name: 'PopWindow',
  props: ['icon'],
  mixins: [iconsMixin],
  computed: {
    ...mapGetters({
      messages: 'msg/GET',
      // show: 'msg/MESSAGE_VISIBLE',
    }),
  },
  methods: {
    ...mapActions({
      getNotifications: 'msg/GET_NOTIFICATIONS',
    }),
  },
  mounted() {
    // setTimeout(() => this.getNotifications(), 1000);
    // setInterval(() => this.getNotifications(), 9000);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
@media (min-width: $mobile-breakpoint) {
  .messages {
    position: fixed;
    height: 0;
    width: 350px;
    right: 5%;
    bottom: 10%;
    z-index: 10;
    display: flex;
    flex-direction: column-reverse;
    .mess {
      margin: 10px 0;
      position: relative;
      bottom: 0;
      border-radius: 20px 20px 0px 20px;
      height: 60px;
      // line-height: 60px;
      padding: 20px 20px 20px 70px;
      .icon {
        position: absolute;
        top: 15px;
        left: 20px;
        height: 30px;
        padding: 0;
        font-size: 30px;
      }
    }
  }
}
</style>
