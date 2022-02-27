<script setup>
import { onMounted, ref } from "vue";
import { useLogsStore } from "@/stores/logs";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";
import TamagotchiChoice from "@/components/tamagotchi/TamagotchiChoice.vue";
import TamagotchiIndicators from "@/components/tamagotchi/TamagotchiIndicators.vue";
import TamagotchiInfo from "@/components/tamagotchi/TamagotchiInfo.vue";
import { useLoadingStore } from "../stores/loading";

const loading = useLoadingStore();
const logs = useLogsStore();

let userData = ref({});

function loadData() {
  if (logs.uid) {
    loading.show();
    onSnapshot(doc(db, "users", logs.uid), (data) => {
      if (data.exists()) {
        userData.value = data.data();
        loading.hide();
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
  background-color: rgb(153,217,234);
  display: grid;
  grid-template-areas:
    "actions"
    "character"
    "panel";
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
