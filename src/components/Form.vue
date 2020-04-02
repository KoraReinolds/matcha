<template>
  <form action="">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  data: () => ({
  }),
  props: ['rule_list'],
  beforeMount() {
    if (this.rule_list) {
      Object.entries(this.rule_list).forEach(([key, rules]) => {
        this.rule_list[key] = {
          rules,
          valid: rules.length === 0,
          value: key,
        };
      });
      Object.defineProperty(this.rule_list, 'valid', {
        enumerable: false,
        get: () => Object.values(this.rule_list).every((rule) => rule.valid === true),
      });
    }
  },
};
</script>
