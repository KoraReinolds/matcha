<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
#app {
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
    // background: transparent;
  }
}
</style>
