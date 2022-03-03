<script setup>
import TheLoading from "@/components/TheLoading.vue";
import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();
</script>

<template>
  <the-loading v-if="loading.loading" />
  <router-view v-show="!loading.loading" />
</template>

<style>
@import "@/assets/base.css";
</style>
