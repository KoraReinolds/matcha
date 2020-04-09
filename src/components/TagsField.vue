<template>
  <div
    :class="[
      'tag-field',
    ]"
  >
    <TextField
      v-if="value.length < maxTags"
      :label="label"
      v-model.trim="newTag"
      outlined
      :error="errorMsg"
      @blur="addTag"
      @keyup.enter="addTag"
    />
    <div
      v-else
      :class="[
        'title',
        'left',
      ]"
    >
      Tags
    </div>
    <div
      class="tags"
    >
      <Tag
        v-for="(tag, index) in value"
        :key="label+tag"
        :name="tag"
        @click="deleteTag(index)"
      >
      </Tag>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import Tag from '@/components/Tag.vue';
import validateMixin from '@/mixins/validateMixin';

export default {
  name: 'tagsFielld',
  data: () => ({
    newTag: null,
    errorMsg: null,
  }),
  mixins: [validateMixin],
  components: {
    TextField,
    Tag,
  },
  props: ['label', 'value', 'rules', 'maxTags'],
  watch: {
    value() {
      this.validate(this.value);
    },
  },
  methods: {
    deleteTag(index) {
      this.value.splice(index, 1);
    },
    addTag() {
      if (this.newTag && !this.value.includes(this.newTag)) {
        this.value.push(this.newTag);
      }
      this.newTag = null;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.tag-field {
  .tags {
    padding-bottom: 20px;
    text-align: left;
    .tag {
      margin: 5px 10px 5px 0px;
    }
  }
}

</style>
