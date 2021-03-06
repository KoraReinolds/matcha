<template>
  <div
    :class="[
      'image-field',
      {
        error: errorMsg,
      }
    ]"
  >
    <div
      :class="[
        'title',
        'left',
      ]"
    >
      {{ label }}
    </div>
    <div
      class="content"
    >
      <div
        class="images"
      >
        <label
          v-if="value.length < 5"
          class="image add"
          for="file"
        >
          <font-awesome-icon
            :class="[
              'fa-2x',
              'choose_file',
            ]"
            icon="plus"
          />
          <input
            type="file"
            id="file"
            @change="processFile($event)"
            class="inputfile"
          >
        </label>
        <div
          v-for="(img, index) in value"
          :key="'img'+index"
          class="image"
        >
          <font-awesome-icon
            :class="[
              'delete_mark',
              'fa-2x',
            ]"
            icon="times-circle"
            @click="deleteImg(index)"
          />
          <CustomImage
            :src="img.src"
            :key="'user_image'+index"
            @click="setAsMainImg(index)"
          />
          <font-awesome-icon
            class="icon main_mark fa-2x"
            icon="check"
            v-if="img.main"
          />
        </div>
      </div>
    </div>
    <div
      :class="['tooltip-field']"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
import validateMixin from '@/mixins/validateMixin';
import CustomImage from '@/components/CustomImage.vue';
import axios from 'axios';

export default {
  name: 'imagesFielld',
  components: {
    CustomImage,
  },
  data: () => ({
    newImageId: -1,
    errorMsg: null,
  }),
  mixins: [validateMixin],
  props: ['label', 'value', 'rules'],
  methods: {
    deleteImg(index) {
      const { main } = this.value.splice(index, 1)[0];
      if (main && this.value.length) this.setAsMainImg(0);
    },
    setAsMainImg(index) {
      Object.keys(this.value).forEach((img) => { this.value[img].main = false; });
      this.value[index].main = true;
    },
    processFile({ target: { files } }) {
      const len = Object.keys(this.value).length;
      const img = {
        src: null,
        id: this.newImageId,
        main: len === 0,
      };
      if (files[0].type === 'image/jpeg' && len < 5) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.value.push(img);
          const fd = new FormData();
          fd.append('image', reader.result.split(',')[1]);
          axios.post('https://api.imgbb.com/1/upload?expiration=3600&key=52cdc2758163512d48d7ac9715a14c64', fd)
            .then((resp) => {
              img.src = resp.data.data.display_url;
              this.$store.commit('SET_VALUE', {
                key: this.field,
                val: this.value,
              });
            })
            .catch((e) => console.log(e));
          if (!len) {
            this.$store.commit('SET_CHANGE', {
              key: 'changeImageMain',
              val: this.newImageId,
            });
          }
          this.newImageId -= 1;
        };
      }
    },
  },
  watch: {
    value() {
      this.validate(this.value);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.image-field {
  .content {
    padding: 10px 0 20px 0;
    .inputfile {
      width: 0px;
      height: 0px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }

    .images {
      display: flex;
      @media (max-width: 480px) {
        min-height: 130px;
        flex-wrap: wrap;
        margin: 20px 0;
      }
      .image {
        cursor: pointer;
        position: relative;
        @media (max-width: 480px) {
          width: 50%;
          padding: 5px;
          height: auto;
        }
        @media (min-width: 480px) {
          width: 200px;
          height: 300px;
          margin-right: 10px;
        }
        .img {
          width: 100%;
          height: 100%;
        }
        .delete_mark {
          cursor: pointer;
          color: white;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .main_mark {
          color: white;
          position: absolute;
          bottom: 10px;
          left: 10px;
        }
        &.add {
          border: 2px solid $main-color;
          padding-right: 0;
        }
      }
    }
    .choose_file {
      cursor: pointer;
      position:absolute;
      color: $main-color;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &.error {
    .images .image.add {
      border: 2px solid $error-color;
    }
    .choose_file {
      color: $error-color;
    }
    label:before {
      background: rgba($color: $error-color, $alpha: 0.75) !important;
    }
  }
}

</style>
