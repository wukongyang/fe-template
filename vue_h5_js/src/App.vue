<template>
  <router-view />
</template>

<script setup lang="ts">
  import debug from '@/utils/debug';
 

  onMounted(() => {
    debug.init();
    
  });


</script>

<style>
  #app {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
</style>
