<script setup>
import { useErrorStore } from "../stores/error";

const error = useErrorStore();
</script>

<template>
  <div v-if="error.error">{{ error.error }}</div>
</template>

<style scoped>
div {
  width: 200px;
  position: absolute;
  left: calc(50% - 100px);
  bottom: 60px;
  border-radius: 10px;
  background-color: rgba(51, 51, 51, 0.9);
  padding: 10px;
  text-align: center;
}
</style>
