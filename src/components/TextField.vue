<template>
  <div
    :class="[
      'text-field',
      {
        filled: filledMode,
        regular: regularMode,
        outlined: outlinedMode,
        rounded: roundedMode,
        focus: focus,
        empty: !value,
        error: errorMsg,
      },
    ]"
  >
  <!-- {{this.rules}} -->
    <fieldset
      :class="[
        'input-field',
      ]"
      align="left"
      aria-hidden="true"
      @click.prevent="focusInput"
    >
      <legend
        :style="{
          width: (focus || value) ? `${legendLen + 8}px`: '0px',
        }"
      ></legend>
      <input
        :id="id"
        ref="input"
        type="text"
        @focus="focus = true"
        @blur="focus = false"
        @input="validate($event.target.value)"
        :value="value"
      >
      <label
        :for="id"
        ref="label"
      >
        {{ label }}
      </label>
    </fieldset>
    <div
      v-if="errorMsg !== true"
      :class="['tooltip-field']"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: ['label', 'value', 'color', 'outlined', 'filled', 'rounded', 'rules'],
  data: () => ({
    focus: false,
    regularMode: null,
    outlinedMode: null,
    roundedMode: null,
    filledMode: null,
    legendLen: null,
    id: null,
    curVal: null,
    errorMsg: null,
  }),
  computed: {

  },
  methods: {
    focusInput() {
      const { length } = this.$refs.input.value;
      this.$refs.input.setSelectionRange(length, length);
      this.$refs.input.focus();
    },
    validate(value) {
      this.$emit('input', value);
      if (this.rules && this.rules.rules) {
        let msg = null;
        this.rules.rules.every((rule) => {
          msg = rule(value);
          if (msg !== true) {
            this.errorMsg = msg;
            this.rules.valid = false;
            return false;
          }
          return true;
        });
        if (msg === true) {
          this.errorMsg = null;
          this.rules.valid = true;
        }
      }
    },
    randomValue: (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1)),
    rand(str) { return str[this.randomValue(0, str.length - 1)]; },
    randId() {
      let id = '';
      for (let i = 0; i < 5; i += 1) {
        id += this.rand('1234567890qwertyuiopasdfghjklzxcvbnm');
      }
      return id;
    },
  },
  watch: {
    value(val) { this.validate(val); },
  },
  mounted() {
    this.filledMode = this.filled === '';
    this.outlinedMode = this.outlined === '';
    this.roundedMode = this.rounded === '';
    if (this.outlined !== '') {
      this.regularMode = true;
    }
    if (this.rounded === '') {
      this.outlinedMode = true;
      this.regularMode = null;
    }
    this.id = this.randId();
    this.curVal = this.value;
    if (this.value) this.legendLen = this.$refs.label.offsetWidth;
    else this.legendLen = this.$refs.label.offsetWidth * 0.75;
  },
};
</script>

<style lang="scss">
  $error-color: rgb(241, 44, 44);
  .text-field {
    height: 86px;
    .input-field {
      cursor: text;
      transition: all 0.3s;
      border: solid 1px rgba($color: #000000, $alpha: 0.45);
      position: relative;
      width: 100%;
      left: 0;
      top: 0px;
      height: 56px;
      legend {
        transition: width 0.3s;
        margin-left: 8px;
      }
      input {
        background: transparent;
        font-size: 16px;
        height: 32px;
        width: 100%;
        &:focus {
          outline: none;
        }
      }
      label {
        position: absolute;
        left: 12px;
        top: 16px;
        transition: all 0.3s;
        font-size: 16px;
        color: rgba($color: #000000, $alpha: 0.45);
      }
      &:hover {
        border-color: rgba(0.0, 0.0, 0.0, 0.75);
        label {
          color: rgba(0.0, 0.0, 0.0, 0.75);
        }
      }
    }
    &.error {
      .tooltip-field,
      label {
        color: $error-color !important;
      }
      .input-field::after {
        background: $error-color !important;
      }
      .input-field {
        border-color: $error-color !important;
      }
    }
    &.focus,
    &:not(.empty) {
      label {
        font-size: 12px;
      }
    }

    &.regular {
      .input-field {
        border: transparent;
        border-bottom: solid 1px rgba($color: #000000, $alpha: 0.45);
        input {
          padding: 8px 12px;
          position: absolute;
          bottom: 0;
        }
        label {
          top: 26px;
        }
        &::after {
          content: "";
          position: absolute;
          transition: width 0.5s;
          display: block;
          height: 1px;
          bottom: 0;
          width: 0%;
          background: rgba(0.0, 0.0, 0.0, 0.45);
        }
        &:hover {
          border-color: rgba(0.0, 0.0, 0.0, 0.75);
        }
      }
      &.focus,
      &:not(.empty) {
        .input-field {
          label {
            top: 5px;
          }
        }
      }
      &.focus {
        .input-field::after {
          width: 100%;
        }
      }
    }

    &.outlined {
      .input-field {
        border-radius: 8px;
        input {
          position: relative;
          top: 11px;
          padding: 8px 12px;
        }
      }
      &.focus,
      &:not(.empty) {
        label {
          top: -9px;
        }
      }
      &.focus {
        fieldset {
          border: 2px solid rgba(0.0, 0.0, 0.0, 0.45);
        }
      }
    }

    &.rounded {
      .input-field {
        border-radius: 28px;
        legend {
          margin-left: 22px;
        }
        input {
          position: absolute;
          bottom: 0px;
          padding: 8px 26px;
        }
        label {
          left: 26px;
        }
      }
    }

    &.filled {
      .input-field {
        background: rgba($color: #000000, $alpha: 0.05);
        &:hover {
          background: rgba($color: #000000, $alpha: 0.1);
        }
      }
      &.error {
        .input-field {
          background: rgba($color: $error-color, $alpha: 0.05);
        }
      }
    }

  &.rounded .tooltip-field {
    padding: 0 26px;
  }
  .tooltip-field {
    font-size: 0.7em;
    text-align: left;
    padding: 0 12px;
  }

}
</style>
