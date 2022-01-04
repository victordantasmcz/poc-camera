<script setup>
import { ref } from '@vue/reactivity';
import HelloWorld from './components/HelloWorld.vue'
const feedbackVisible = ref(false);
</script>

<template>
  <div style="height: calc(100vh - 16px);">
    <HelloWorld @feedback="feedbackVisible = !feedbackVisible"/>
    <iframe
      v-show="feedbackVisible"
      src="https://docs.google.com/forms/d/e/1FAIpQLSeaQ7hryk9sLw5eE9UwB77msF1c9E17sz6IX91Z0LgaGYDyXg/viewform?embedded=true"
      height="80%"
      style="position: fixed; top: 44px; background: white;"
      width="100%"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading
    </iframe>
  </div>
</template>

<style>
  button {
    height: 36px;
    margin-bottom: 8px;
  }
</style>

