<template>
  <div
    v-if="user && me"
    id="user-page"
  >

    <div
      class="main-images"
    >
      <CustomImage
        :width="mobile ? '100%' : '200px'"
        :height="mobile ? '100%' : '300px'"
        :src="user.pictures.find((img) => img.main).src"
        :key="'user_image'+user.id"
      />
      <div
        class="icons"
        v-if="user.id !== me.id"
      >
        <Like
          :size="2"
          :active="myLikeList.includes(user.id)"
          :user="user"
        />
        <Ban
          :size="2"
          :user="user"
        />
        <Block
          :size="2"
          :user="user"
        />
      </div>
      <ChatLink
          v-if="user.id != me.id &&
          myLikeList.includes(user.id) &&
          visitorLikeList.includes(user.id)"
          class="chat-link"
          :user="user"
      />
    </div>
    <div
      class="info"
    >

      <div
        class="field"
      >
        <span
          class="fio"
        >
          <NameLink
            :user="user"
          />
          <Raiting
            class="rate"
            :value="user.fameRating"
          />
          <Distance
            class="dist"
            :value="user.dist"
          />
          <Online
            class="online"
            :time="this.user.time"
          />
        </span>
      </div>

      <div
        :class="[
          'title',
          'left'
        ]"
      >
        Gender
      </div>
      <div
        class="field gender"
      >
        {{ user.gender }}
      </div>

      <div
        :class="[
          'title',
          'left'
        ]"
      >
        Preferences
      </div>
      <div
        class="field preferences"
      >
        <span
          v-for="pref in user.preferences"
          :key="`user_pref_${pref}`"
        >
          {{ pref }}
        </span>
      </div>

      <div
        :class="[
          'title',
          'left'
        ]"
      >
        Biography
      </div>
      <div
        class="field biography"
      >
        {{ user.biography }}
      </div>

      <div
        :class="[
          'title',
          'left'
        ]"
      >
        Tags
      </div>
      <div
        class="field tags"
      >
        <Tag
          v-for="tag in user.tags"
          :key="`user_tag_${tag}`"
          :name="tag"
        >
        </Tag>
      </div>

      <div
        :class="[
          'title',
          'left'
        ]"
      >
        Images
      </div>
      <div
        class="field images"
      >
        <CustomImage
          class="image"
          height="100px"
          width="100px"
          v-for="img in user.pictures"
          :src="img.src"
          :key="'img'+img.id"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomImage from '@/components/CustomImage.vue';
import NameLink from '@/components/NameLink.vue';
import ChatLink from '@/components/ChatLink.vue';
import Tag from '@/components/Tag.vue';
import Ban from '@/components/Ban.vue';
import Block from '@/components/Block.vue';
import Like from '@/components/Like.vue';
import Distance from '@/components/Distance.vue';
import Raiting from '@/components/Raiting.vue';
import Online from '@/components/Online.vue';

export default {
  name: 'user-page',
  components: {
    CustomImage,
    NameLink,
    ChatLink,
    Tag,
    Ban,
    Block,
    Like,
    Distance,
    Raiting,
    Online,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      me: 'user/USER',
      user: 'users/CURRENT_USER',
      visitorLikeList: 'users/VISITOR_LIKES',
      myLikeList: 'users/MY_LIKES',
      location: 'user/LOCATION',
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    ...mapMutations({
      chatWIthUser: 'users/SET_CUR_CHAT_USER_ID',
      setCurUserId: 'users/SET_CUR_USER_ID',
    }),
    ...mapActions({
      visitUser: 'users/VISIT_USER',
    }),
  },
  watch: {
    $route() {
      this.setCurUserId(this.$route.params.id);
    },
  },
  mounted() {
    this.setCurUserId(+this.$route.params.id);
    this.visitUser(+this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

#user-page {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 50px 10px;
  @media (max-width: $mobile-breakpoint) { padding: 0 0 50px 0; }
  .main-images {
    position: relative;
    @media (max-width: $mobile-breakpoint) { margin-bottom: 90px; };
    @media (max-width: $mobile-breakpoint) { width: 100%; }
    .icons {
      color: lightgray;
      display: flex;
      position: relative;
      justify-content: space-around;
    }
    .chat-link {
      position: relative;
      top: 10px;
    }
  }
  .info {
    @media (min-width: $mobile-breakpoint) { width: 600px; };
    @media (max-width: $mobile-breakpoint) { width: 100%; };
    margin: 0 30px;
    @media (max-width: $mobile-breakpoint) { margin: 0; }
    .field {
      position: relative;
      width: 100%;
      padding: 10px 5%;
      .fio {
        display: flex;
        flex-wrap: wrap;
        @media (max-width: $mobile-breakpoint) { flex-direction: column; };
        position: relative;
        font-family: 'Lobster', cursive;
        font-size: 20px;
        .name,
        .rate,
        .dist {
          margin: 5px 20px 5px 0;
        }
        .online {
          @media (min-width: $mobile-breakpoint) { margin-left: auto; };
        }
      }
    }
    .tags,
    .preferences {
      span {
        margin-right: 10px;
      }
    }
    .tags span {
      cursor: default;
    }
    .image {
      margin: 5px;
    }
  }
}
</style>
