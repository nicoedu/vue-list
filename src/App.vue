<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.scss";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  height: 100%;
  width: 100%;
  font-weight: normal;
}
</style>
