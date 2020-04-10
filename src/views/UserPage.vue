<template>
  <div
    v-if="user && me"
    id="user-page"
  >

    <div
      class="images"
    >
      <CustomImage
        :width="mobile ? '100%' : '200px'"
        :height="mobile ? '100%' : '300px'"
        :src="user.pictures.find((img) => img.main).src"
        :key="'user_image'+user.id"
      />
      <div
        class="icons"
        v-if="user.id === me.id"
      >
        <Like
          :size="2"
        />
        <Ban
          :size="2"
        />
        <Block
          :size="2"
        />
        <!-- <font-awesome-icon
          :class="[
            'icon',
            'ban',
            'fa-2x',
          ]"
          icon="ban"
          @click="ban(user.id)"
        />
        <font-awesome-icon
          :class="[
            'icon',
            'block',
            'fa-2x',
          ]"
          icon="user-slash"
          @click="block(user.id)"
        /> -->
      </div>
      <router-link
        v-if="user.id != me.id &&
        myLikeList.includes(user.id) &&
        visitorLikeList.includes(user.id)"
        :to="{ path: `/chat` }"
      >
        <div
          class="to_chat"
          @click="chatWIthUser(user.id)"
        >
          Join to chat
        </div>
      </router-link>
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
          <span
            class="name"
          >
            {{`${user.firstName} ${user.lastName}, ${user.age}`}}
          </span>
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
      like: 'users/LIKE',
      chatWIthUser: 'users/SET_CUR_CHAT_USER_ID',
      setCurUserId: 'users/SET_CUR_USER_ID',
    }),
    ...mapActions({
    }),
  },
  watch: {
    $route() {
      this.setCurUserId(this.$route.params.id);
    },
  },
  mounted() {
    this.setCurUserId(this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

#user-page {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 50px 10px;
  @media (max-width: $mobile-breakpoint) { padding: 0 0 50px 0; }
  .images {
    position: relative;
    @media (max-width: $mobile-breakpoint) { margin-bottom: 40px; };
    @media (max-width: $mobile-breakpoint) { width: 100%; }
    .icons {
      color: lightgray;
      display: flex;
      position: relative;
      justify-content: space-around;
      .user-slash .inner_icon {
        position: absolute;
        left: -5px;
        transform: scale(0.8);
      }
    }
    .to_chat {
      position: relative;
      background-color: $main-color;
      bottom: 60px;
      padding: 10px;
      text-align: center;
      color: #fff;
      font-family: 'Lobster', cursive;
    }
  }
  .info {
    margin: 0 30px;
    @media (max-width: $mobile-breakpoint) { margin: 0; }
    .field {
      position: relative;
      max-width: 600px;
      margin: 10px 5%;
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
