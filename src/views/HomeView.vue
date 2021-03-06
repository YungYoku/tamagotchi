<script setup>
import { onMounted, ref } from "vue";
import { useLogsStore } from "@/stores/logs";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import TamagotchiChoice from "@/components/tamagotchi/TamagotchiChoice.vue";
import TamagotchiIndicators from "@/components/tamagotchi/TamagotchiIndicators.vue";
import TamagotchiButtons from "@/components/tamagotchi/TamagotchiButtons.vue";
import TamagotchiPerson from "@/components/tamagotchi/TamagotchiPerson.vue";
import { useLoadingStore } from "@/stores/loading";
import { getAmountOfDaysFromYearStart } from "@/js/api";
import TamagotchiDeath from "@/components/tamagotchi/TamagotchiDeath.vue";
import TheTip from "@/components/TheTip.vue";

const loading = useLoadingStore();
const logs = useLogsStore();

let userData = ref({});

function createEverydayPrize() {
  if (getAmountOfDaysFromYearStart() > userData.value.lastLogin) {
    updateDoc(doc(db, "users", logs.uid), {
      experience: userData.value.experience + 20,
      coins: userData.value.coins + 1000,
      lastLogin: getAmountOfDaysFromYearStart(),
    });
  }
}

function loadData() {
  if (logs.uid) {
    loading.show();
    new Promise((resolve) => {
      onSnapshot(doc(db, "users", logs.uid), (data) => {
        if (data.exists()) {
          userData.value = data.data();
          loading.hide();
          resolve();
        }
      });
    }).then(() => {
      createEverydayPrize();
    });
  }
}

onMounted(() => loadData());
</script>

<template>
  <div class="home">
    <tamagotchi-indicators
      v-if="userData.persChoice && userData.indicators"
      :coins="userData.coins"
      :experience="userData.experience"
      :indicatorsData="userData.indicators"
      :regDate="userData.regDate"
      class="indicators"
    />

    <tamagotchi-person
      v-if="userData.persChoice"
      :index="userData.persChoice"
      class="person"
    />

    <tamagotchi-choice v-if="!userData.persChoice" class="choice" />

    <tamagotchi-buttons
      v-if="userData.persChoice"
      :coins="userData.coins"
      :experience="userData.experience"
      :indicatorsData="userData.indicators"
      class="info"
    />

    <tamagotchi-death
      v-if="userData.persChoice && !userData.indicators.health.value"
    />

    <the-tip v-if="userData.persChoice" />
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  user-select: none;
  gap: 40px;
}
</style>
