<template>
  <pv-toast />
  <Toolbar />
  <router-view />
</template>

<script>
import Toolbar from "./public/components/Toolbar.vue";

export default {
  components: {
    Toolbar
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
