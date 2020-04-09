export default {
  methods: {
    validate(value) {
      // this.$emit('input', value);
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
  },
};
