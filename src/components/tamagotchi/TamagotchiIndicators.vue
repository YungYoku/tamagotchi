<script setup>
import { computed, reactive } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { useLogsStore } from "../../stores/logs";

const logs = useLogsStore();

let props = defineProps({
  experience: {
    type: Number,
    required: true,
  },
  indicatorsData: {
    type: Object,
    required: true,
  },
});

const indicators = reactive({
  happiness: {
    name: "happiness",
    title: "Счастье",
    action: "Покормить",
    value: computed(() => props.indicatorsData.happiness.value),
    power: 7,
    speed: 20000,
    exp: 5,
  },
  purity: {
    name: "purity",
    title: "Чистота",
    action: "Помыть",
    value: computed(() => props.indicatorsData.purity.value),
    power: 7,
    speed: 40000,
    exp: 5,
  },
  health: {
    name: "health",
    title: "Здоровье",
    action: "Вылечить",
    value: computed(() => props.indicatorsData.health.value),
    power: 10,
    speed: 30000,
    exp: 10,
  },
  fatigue: {
    name: "fatigue",
    title: "Усталось",
    action: "Отправить спать",
    value: computed(() => props.indicatorsData.fatigue.value),
    power: 90,
    speed: 60000,
    exp: 15,
  },
});

function getDate() {
  return (
    new Date().getUTCFullYear() +
    "." +
    (new Date().getUTCMonth() + 1) +
    "." +
    new Date().getUTCDate() +
    "." +
    new Date().getUTCHours() +
    "." +
    new Date().getUTCMinutes() +
    "." +
    new Date().getUTCSeconds()
  );
}

function increase(indicator) {
  if (
    props.indicatorsData.hasOwnProperty(indicator) &&
    props.indicatorsData[indicator].value < 100
  ) {
    const temp = props.indicatorsData;
    temp[indicator].value += indicators[indicator].power;
    if (temp[indicator].value > 100) temp[indicator].value = 100;
    temp[indicator].lastIncrease = getDate();

    const experience = props.experience + indicators[indicator].exp;

    updateDoc(doc(db, "users", logs.uid), {
      experience,
      indicators: temp,
    });
  }
}

for (let indicator in indicators) {
  setInterval(() => {
    if (props.indicatorsData[indicator].value > 0) {
      const temp = props.indicatorsData;
      temp[indicator].value -= 10;
      if (temp[indicator].value < 0) temp[indicator].value = 0;

      updateDoc(doc(db, "users", logs.uid), {
        indicators: temp,
      });
    }
  }, indicators[indicator].speed);
}
</script>

<template>
  <div class="indicators">
    <div v-for="indicator in indicators" :key="indicator.title">
      <div class="i-a-a-content">
        <button class="button button-eat" @click="increase(indicator.name)">
          <img
            alt="Apple"
            class="picture-button"
            src="@/assets/img/apple.png"
          />
          {{ indicator.action }}
        </button>
      </div>
      <div class="text-and-progress">
        <p>{{ indicator.title }}</p>
        <progress
          :value="indicator.value"
          class="happiness"
          max="100"
        ></progress>
      </div>
    </div>
  </div>
</template>

<style scoped>
.indicators > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25%;
}

.text-and-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.button-eat {
  left: 20%;
  float: left;
}

.button {
  border-radius: 10px;
  box-shadow: 0 2px 8px 1px var(--color-shadow);
  padding: 5px 10px;
  margin: 0 100px 0 0;
  background-color: #ffdab9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  transform: scale(1.1);
}

.picture-button {
  margin-right: 10px;
  max-width: 30px;
}
</style>
