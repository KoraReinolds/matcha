<template>
  <div
    :class="[
      'option-field',
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
      :class="[
        'options',
        {
          many: type === 'checkbox',
        }
      ]">
      <div
        v-for="opt in options"
        :key="label+opt"
      >
        <input
          :type="type"
          :id="label+opt"
          :value="opt"
          @change="change"
          :name="label"
          :checked="opt === value || value.includes(opt)"
        >
        <label
          :for="label+opt"
        >
        {{ opt }}
        </label>
      </div>
      <div
        :class="['tooltip-field']"
      >
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script>
import lib from '@/library/customFunc';
import validateMixin from '@/mixins/validateMixin';

export default {
  name: 'Options',
  props: ['label', 'value', 'options', 'many', 'rules'],
  data: () => ({
    type: null,
    errorMsg: null,
  }),
  mixins: [validateMixin],
  computed: {
  },
  methods: {
    change(event) {
      const { value } = event.target;
      if (Array.isArray(this.value)) {
        if (!this.value.includes(value)) this.value.push(value);
        else lib.deleteIfExist(this.value, value);
      }
    },
  },
  watch: {
    value() {
      this.validate(this.value);
    },
  },
  mounted() {
    this.type = this.many === '' ? 'checkbox' : 'radio';
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.option-field {
  text-align: left;
  .options {
    input {
      z-index: -1;
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + label:after {
        top: 10px;
        left: -25px;
        width: 10px;
        height: 10px;
      }
    }
    label {
      cursor: pointer;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      position: relative;
      font-weight: normal;
      left: 30px;
      &:before {
        cursor: pointer;
        content: '';
        position: absolute;
        top: 5px;
        left: -30px;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: $main-color;
        transition: .2s;
      }
      &:after {
        content: '';
        width: 0;
        height: 0;
        top: 15px;
        left: -20px;
        position: absolute;
        border-radius: 8px;
        background: #fff;
        transition: .2s;
      }
    }
    &.many {
      input:checked + label:after {
        top: 10px;
        left: -25px;
        width: 10px;
        height: 10px;
      }
      label {
        &:before {
          cursor: pointer;
          content: '';
          position: absolute;
          top: 5px;
          left: -30px;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: $main-color;
          transition: .2s;
        }
        &:after {
          content: '';
          width: 0;
          height: 0;
          top: 15px;
          left: -20px;
          position: absolute;
          border-radius: 2px;
          background: #fff;
          transition: .2s;
        }
      }
    }
  }
  &.error {
    label:before {
      background: rgba($color: $error-color, $alpha: 0.75) !important;
    }
  }
}

</style>
