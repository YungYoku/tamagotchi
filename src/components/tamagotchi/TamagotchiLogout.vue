<script lang="ts" setup>
import logoutImage from "@/assets/img/logout.png";
import { useLogsStore } from "@/stores/logs.js";

const logs = useLogsStore();

function logout() {
  logs.logout();
}
</script>

<template>
  <div>
    <button @click="logout">
      <img :src="logoutImage" alt="Выход" />
    </button>
  </div>
</template>

<style scoped>
button {
  width: 60px;
  height: 60px;
}

img {
  width: 100%;
  height: 100%;
}
</style>
