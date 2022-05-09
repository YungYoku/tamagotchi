<script lang="ts" setup></script>

<template>
  <div class="loadingWrap">
    <div class="loading"></div>
  </div>
</template>

<style scoped>
.loadingWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  background-color: var(--color-background2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  width: 50px;
  height: 50px;
  border: 2px solid var(--color-heading);
  border-radius: 50%;
  position: relative;
  z-index: 9;
  animation: circleRotate 1s linear infinite;
}

.loading::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: -20px;
  left: -20px;
  background-color: var(--color-background2);
}

@keyframes circleRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
