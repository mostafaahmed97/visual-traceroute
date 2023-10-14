<template>
  <search-bar></search-bar>
  <side-list></side-list>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { syncGlobeToState } from '@/store/globe';

import { bootstrapGlobe } from '@/components/globe';
import SearchBar from '@/components/search-bar/SearchBar.vue';
import SideList from '@/components/side-list/SideList.vue';

onMounted(() => {
  bootstrapGlobe();
  syncGlobeToState();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: 'Rubik', sans-serif;
}

body {
  margin: 0;
}
canvas {
  display: block;
}
</style>
