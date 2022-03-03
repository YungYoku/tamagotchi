<script setup>
import { computed } from "vue";
import { getAmountOfHoursFromYearStart } from "@/js/api";

const props = defineProps({
  regDate: {
    type: Number,
    required: true,
  },
});

let hours = computed(() => getAmountOfHoursFromYearStart() - props.regDate);
</script>

<template>
  <div class="data-panel">
    <p>Время жизни: {{ hours }} часов</p>
  </div>
</template>

<style scoped>
.data-panel {
  height: 100%;
  background-color: rgb(200, 191, 231);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}
</style>
