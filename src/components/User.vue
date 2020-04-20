<template>

  <div
    class="user"
    :class="[
      user.gender
    ]"
  >
    <div
      class="image"
    >
      <CustomImage
        class="custom_image"
        :src="user.pictures.find((img) => img.main).src"
        @click="paginate"
        :height="mobile ? '100%' : '240px'"
        :width="mobile ? '100%' : '240px'"
        :rounded="!mobile"
      />
      <RoundedIcon
        :class="[
          'gender',
        ]"
        :icon="user.gender" :size="mobile ? 7 : 7"
        :mask="mobile"
        :style="getByDeg(210)"
      />

      <RoundedIcon
        :class="[
          `pref_${index}`,
          'pref_icon'
        ]"
        v-for="(gender, index) in user.preferences"
        :key="'pref'+user.id+gender"
        :icon="gender" :size="mobile ? 3 : 3"
        :mask="mobile"
        :style="getByDeg(245 + 20 * index)"
      />
      <div
        class="like-icon"
        :style="[
          getByDeg(90),
        ]"
      >
        <Like
          class="like"
          :user="user"
          :active="myLikeList.includes(user.id)"
          size="2"
        />
      </div>
    </div>

    <div
      class="content"
    >
      <span
        class="fio"
      >
        <NameLink
          class="age"
          :user="user"
        />
        {{ `${user.age} y.o.` }}
        <Raiting
          class="icon only_laptop"
          :value="user.fameRating"
        />
        <Distance
          class="icon only_laptop"
          :value="user.dist"
        />
      </span>


      <div
        class="only_laptop biography"
      >
        <div
          class="text"
        >
          {{ `${user.biography}` }}
        </div>
      </div>
      <div
        class="only_laptop tags"
      >
        <Tag
          v-for="tag in user.tags"
          :key="`user_tag_${tag}`"
          :name="tag"
        >
        </Tag>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import CustomImage from '@/components/CustomImage.vue';
import NameLink from '@/components/NameLink.vue';
import Raiting from '@/components/Raiting.vue';
import Distance from '@/components/Distance.vue';
import Tag from '@/components/Tag.vue';
import Like from '@/components/Like.vue';

export default {
  name: 'user',
  components: {
    RoundedIcon,
    CustomImage,
    NameLink,
    Raiting,
    Distance,
    Tag,
    Like,
  },
  props: ['user'],
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
      myLikeList: 'users/MY_LIKES',
      location: 'LOCATION',
    }),
  },
  methods: {
    paginate(e) {
      if (this.mobile) {
        if (e.clientX > window.innerWidth * 0.8) {
          this.moveUpPage();
        } else if (e.clientX < window.innerWidth * 0.2) {
          this.moveDownPage();
        }
      }
    },
    left: (deg) => (1 + Math.cos((deg * Math.PI) / 180)) * 120,
    top: (deg) => (1 - Math.sin((deg * Math.PI) / 180)) * 120,
    getByDeg(deg) {
      return window.innerWidth > 480 ? {
        transform: `
          rotate(${deg}deg)
          translateX(120px)
          rotate(-${deg}deg)
          translate(-50%, -50%)
        `,
      } : {};
    },
    ...mapMutations({
      like: 'users/LIKE',
      moveUpPage: 'tools/MOVE_UP_PAGE',
      moveDownPage: 'tools/MOVE_DOWN_PAGE',
    }),
    ...mapActions({
      addTag: 'tools/ADD_TAG',
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

@media (max-width: 480px) {
  .user {
    height: 80vh;
    .like-icon {
      z-index: 10;
      bottom: 1px;
      right: 50%;
      transform: translateX(50%);
      position: fixed;
      height: 50px;
      width: 50px;
      background: #fff;
      border-radius: 50%;
      .like {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .gender {
      position: fixed;
      top: 70px;
      right: 10px;
      opacity: 0.8;
    }
    .pref_icon {
      position: fixed;
      top: 70px;
      opacity: 0.8;
    }
    .pref_icon:nth-child(n) {
      right: 180px;
    }
    .pref_icon:nth-child(2n) {
      right: 140px;
    }
    .pref_icon:nth-child(3n) {
      right: 100px;
    }
    .fio {
      bottom: 70px;
      left: 30px;
      font-family: 'Lobster', cursive;
      position: fixed;
      font-size: 25px;
    }
    img {
      opacity: 0.9;
      height: 80%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      mask-image: linear-gradient(rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
    }
  }
}
@media (min-width: 480px) {

  $user_height: 300px;
  $user_width: 700px;
  $user_inner_height: 130px;
  $img_big: 240px;
  $img_big_border: 10px;

  @include uesr-animation();
  .user {
    display: flex;
    align-items: center;
    justify-content: start;
    height: $user_height;
    padding-left: 50px;

    .image {
      position: relative;
      background: rgba($color: $main-color, $alpha: 0.4);
      height: 260px;
      max-width: 260px;
      min-width: 260px;
      border-radius: 50%;
      .gender,
      .like-icon,
      .like,
      .pref_icon {
        position: absolute;
        top: 50%;
        left: 50%;
      }
      img {
        margin: 10px;
      }
      .like-icon {
        box-shadow: 0 0 10px lightgrey;
        background: #fff;
        z-index: 100;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        .like {
          transform: translate(-50%, -50%);
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      .fio {
        font-family: 'Lobster', cursive;
      }
      .biography {
        margin: 15px 0;
        padding: 15px 30px;
        .text {
          font-family: 'Rubik', sans-serif;
          line-height: 15px;
          font-size: 12px;
          max-height: 90px;
          overflow: hidden;
        }
        border-right: 1px solid $main-color;
        background: linear-gradient(
          45deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 20%,
          rgba($color: $main-color, $alpha: 0.4) 80%,
          rgba($color: $main-color, $alpha: 1.0) 100%
        );
        border-radius: 200px;
      }
    }
  }
}

</style>
