<script setup>
import { computed } from "vue";

let props = defineProps({
  experience: {
    type: Number,
    required: true,
  },
});

let experience = computed(() => {
  let limit = 100;
  let level = 0;
  let _experience = props.experience;

  while (_experience > limit) {
    level++;
    _experience -= limit;
    limit *= 1.1;
  }

  _experience = Math.floor(_experience);
  limit = Math.floor(limit);

  return {
    level,
    value: _experience,
    limit,
  };
});
</script>

<template>
  <div class="data-panel">
    <p>Время жизни: 0 часов</p>
    <p>Уровень питомца: {{ experience.level }}</p>
    <p>Опыт питомца: {{ experience.value }} / {{ experience.limit }}</p>
  </div>
</template>

<style scoped>
.data-panel {
  background-color: rgb(200,191,231);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
