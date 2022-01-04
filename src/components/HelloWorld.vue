<script setup>
import { ref } from 'vue';
import { useCapture } from '../utils/useCapture';

const { captureInit, stopCapture, switchCamera } = useCapture('#container');

const capture = ref(false);

const handleStart = async () => {
  try {
    await captureInit();
    capture.value = true;
  } catch (error) {
    console.error(error);
    capture.value = false;
  }
};

const handleStop = () => {
  stopCapture();
  capture.value = false;
};

const handleSwitch = async () => {
  try {
    await switchCamera();
    capture.value = true;
  } catch (error) {
    console.error(error);
    capture.value = false;
  }
};

</script>

<template>
  <div id="container">

  </div>
  <button @click="handleStart" :disabled="capture">Start Capture</button>
  <button @click="handleStop" :disabled="!capture">Stop Capture</button>
  <button @click="handleSwitch" :disabled="!capture">Switch</button>
</template>
