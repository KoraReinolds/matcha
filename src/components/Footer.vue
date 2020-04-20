<template>
  <footer
    v-if="user"
    id="footer"
  >
    <div
      class="footer_content"
    >
      <div
        class="only_laptop"
      >
        Make by mskiles (s.shurn94@gmail.com)
      </div>
      <div
        class="only_mobile"
      >
        <router-link
          class="link"
          :to="{ path: `/user/${user.id}` }"
        >
          <font-awesome-icon
            :class="['icon']"
            icon="user"
          />
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'history' }"
        >
          <font-awesome-icon
            :class="['icon']"
            icon="history"
          />
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'main' }"
        >
          <font-awesome-icon
            :class="['icon']"
            icon="search"
          />
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'visitors' }"
        >
          <font-awesome-icon
            :class="['icon']"
            icon="eye"
          />
        </router-link>
        <router-link
          class="link"
          :to="{ name: 'chat' }"
        >
          <font-awesome-icon
            :class="['icon']"
            icon="comment-alt"
          />
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'app',
  data: () => ({
  }),
  components: {
  },
  computed: {
    ...mapGetters({
      user: 'user/USER',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

#footer {
  left: 0;
  z-index: 3;
  position: fixed;
  bottom: 0;
  margin-top: -$footer-height;
  height: $footer-height;
  @media (max-width: $mobile-breakpoint) {
    margin-top: -$footer-height-mobile;
    height: $footer-height-mobile;
    .footer_content {
      justify-content: space-around;
    }
  }
  width: 100vw;
  background-color: $main-color;
  .footer_content {
    font-family: 'Oswald', sans-serif;
    font-size: 18px;
    text-align: right;
    color: white;
    margin: 0 auto;
    padding: 0 $padding-content;
    height: 100%;
    max-width: 100%;
    width: $wrapper-width;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .only_mobile {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .icon {
        color: white;
      }
    }
  }
}

</style>
