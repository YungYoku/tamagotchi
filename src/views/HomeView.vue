<script setup>
import { onMounted, ref } from "vue";
import { useLogsStore } from "@/stores/logs";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";
import TamagotchiChoice from "@/components/tamagotchi/TamagotchiChoice.vue";
import TamagotchiIndicators from "@/components/tamagotchi/TamagotchiIndicators.vue";
import TamagotchiInfo from "@/components/tamagotchi/TamagotchiInfo.vue";

const logs = useLogsStore();

let userData = ref({});

function loadData() {
  if (logs.uid) {
    onSnapshot(doc(db, "users", logs.uid), (data) => {
      if (data.exists()) {
        userData.value = data.data();
      }
    });
  }
}

onMounted(() => loadData());
</script>

<template>
  <div class="home">
    <tamagotchi-choice class="choice" />
    <tamagotchi-indicators
      v-if="userData.indicators"
      :experience="userData.experience"
      :indicatorsData="userData.indicators"
      class="indicators"
    />
    <tamagotchi-info :experience="userData.experience" class="info" />
  </div>
</template>

<style scoped>
.home {
  display: grid;
  grid-template: 80vh 20vh / 2fr 1fr;
  grid-template-areas:
    "character actions"
    "panel panel";
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  user-select: none;
}

.choice {
  grid-area: character;
}

.indicators {
  grid-area: actions;
}

.info {
  grid-area: panel;
}

.choice,
.indicators,
.info {
  width: 100%;
  height: 100%;
}
</style>
