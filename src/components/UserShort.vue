<template>

  <div
    v-if="user"
    :class="[
      'user',
    ]"
  >
    <div
      :class="[
        'img-container',
      ]"
    >
      <RoundedIcon
        class="gender"
        :icon="user.gender"
        size="6"
        :mask="mobile"
      />
      <span class="image">
        <CustomImage
          height="96px"
          width="96px"
          rounded
          :src="user.pictures.find((img) => img.main).src"
        />
        <Like
          class="like"
          :size="2"
          :active="myLikeList.includes(user.id)"
          :user="user"
        />
      </span>
    </div>
    <div
      :class="[
        'info-container',
      ]"
    >
      <div>
        <Like
          class="other-like"
          :size="2"
          :active="visitorLikeList.includes(user.id)"
          :user="user"
        />
        <NameLink
          class="fio"
          :user="user"
        />
      </div>
      <ChatLink
        v-if="myLikeList.includes(user.id) &&
        visitorLikeList.includes(user.id)"
        class="chat-link"
        :user="user"
      />
    </div>

  </div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import NameLink from '@/components/NameLink.vue';
import RoundedIcon from '@/components/RoundedIcon.vue';
import CustomImage from '@/components/CustomImage.vue';
import ChatLink from '@/components/ChatLink.vue';
import Like from '@/components/Like.vue';

export default {
  name: 'userShort',
  props: ['user'],
  components: {
    RoundedIcon,
    CustomImage,
    NameLink,
    ChatLink,
    Like,
  },
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
      myLikeList: 'users/MY_LIKES',
      visitorLikeList: 'users/VISITOR_LIKES',
    }),
  },
  methods: {
    ...mapMutations({
      like: 'users/LIKE',
    }),
    ...mapActions({
      getUserById: 'users/GET_USER_BY_ID',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.user {
  height: 96px;
  display: flex;
  max-width: 600px;
  width: 100%;
  margin-bottom: 12px;
  .img-container {
    position: relative;
    @media (max-width: $mobile-breakpoint) { min-width: 120px; };
    @media (min-width: $mobile-breakpoint) { width: 200px; };
    .gender {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      @media (max-width: $mobile-breakpoint) {
        opacity: 0.7;
        color: $font-color;
      };
    }
    .image {
      display: inline-block;
      position: relative;
      width: 96px;
      height: 96px;
      @media (min-width: $mobile-breakpoint) { left: 70px; };
      .like {
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .info-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .add-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 20px;
  }
}

</style>
