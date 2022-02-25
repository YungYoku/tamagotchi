<script setup>
import { computed } from "vue";

let props = defineProps({
  experience: {
    type: Number,
    required: true,
  },
});

let level = computed(() => {
  return 0;
});
</script>

<template>
  <div class="data-panel">
    <p>Время жизни: 0 дней</p>
    <p>Уровень питомца: {{ level }}</p>
    <p>Опыт питомца: {{ props.experience }} / 100</p>
  </div>
</template>

<style scoped>
.data-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
