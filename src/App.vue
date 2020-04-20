<template>
  <div id="app">
    <PopWindow/>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PopWindow from '@/components/PopWindow.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    PopWindow,
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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
body,
html,
#app {
  p {
    margin: 0;
  }
  div {
    text-align: left;
  }
  min-height: 100vh;
  height: 100%;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
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
    padding-bottom: 30px;
  }
  padding-top: 80px;
  padding-bottom: 80px;
}
</style>
