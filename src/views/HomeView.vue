<script setup>
import { onMounted, ref } from "vue";
import { useLogsStore } from "@/stores/logs";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";
import TamagotchiChoice from "@/components/tamagotchi/TamagotchiChoice.vue";
import TamagotchiIndicators from "@/components/tamagotchi/TamagotchiIndicators.vue";
import TamagotchiInfo from "@/components/tamagotchi/TamagotchiInfo.vue";
import TamagotchiPerson from "@/components/tamagotchi/TamagotchiPerson.vue";
import { useLoadingStore } from "@/stores/loading";

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
    <tamagotchi-indicators
      v-if="userData.persChoice && userData.indicators"
      :experience="userData.experience"
      :indicatorsData="userData.indicators"
      class="indicators"
    />

    <tamagotchi-person
      v-if="userData.persChoice"
      :experience="userData.experience"
      :index="userData.persChoice"
      :indicatorsData="userData.indicators"
      class="person"
    />

    <tamagotchi-choice v-if="!userData.persChoice" class="choice" />

    <tamagotchi-info
      v-if="userData.persChoice"
      :regDate="userData.regDate"
      class="info"
    />
  </div>
</template>

<style scoped>
.home {
  background-color: rgb(153, 217, 234);
  display: grid;
  grid-template: 80px auto 40px / 1fr;
  width: 100%;
  height: 100vh;
  user-select: none;
}
</style>
