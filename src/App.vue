<template>
  <div id="app">
    <Header>123</Header>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  computed: {
    ...mapGetters({
      user: 'user/USER',
    }),
  },
  methods: {
    ...mapMutations({
      resize: 'RESIZE',
    }),
    ...mapActions({
      getUsers: 'user/GET_USERS',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    if (!this.user && localStorage.getItem('user')) this.getUsers();
    this.$nextTick(() => { this.resize(); });
    window.addEventListener('resize', this.resize);
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}
body,
html,
#app {
  p {
    margin: 0;
  }
  min-height: 100vh;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  fieldset {
    padding: 0;
    margin: 0;
    legend {
      padding: 0;
    }
  }
  input {
    border: none;
  }
}
#app {
  @media (max-width: $mobile-breakpoint) {
    padding-top: 30px;
  }
  padding-top: 80px;
}
</style>
