<script setup>
import { onMounted, ref } from "vue";
import { useLogsStore } from "@/stores/logs";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";

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
  <div></div>
</template>

<style scoped></style>
