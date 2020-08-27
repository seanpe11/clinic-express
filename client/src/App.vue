<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
@import url('./assets/style.css');

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F5F5F5;
}
</style>

<script>
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
  }],
};
</script>
