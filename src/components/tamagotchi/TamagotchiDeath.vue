<script setup>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";

const logs = useLogsStore();

function restart() {
  updateDoc(doc(db, "users", logs.uid), {
    persChoice: 0,
  });
}
</script>

<template>
  <div class="wrap">
    <div class="death">
      <h3>Вы погибли</h3>
      <button @click="restart">ОК</button>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.death {
  padding: 20px;
  font-size: 32px;
  background-color: #333333;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  padding: 5px 10px;
  font-size: 24px;
  border-radius: 10px;
  border: 1px solid #ffffff;
}
</style>
