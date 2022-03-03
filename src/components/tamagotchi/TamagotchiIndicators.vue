<script setup>
import { computed, reactive } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";

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

const indicators = reactive({
  happiness: {
    title: "Счастье",
    value: computed(() => props.indicatorsData.happiness.value),
    decrease: 1,
    speed: 2000,
  },

  hunger: {
    title: "Голод",
    value: computed(() => props.indicatorsData.hunger.value),
    decrease: 1,
    speed: 2000,
  },

  purity: {
    title: "Чистота",
    value: computed(() => props.indicatorsData.purity.value),
    decrease: 1,
    speed: 4000,
  },

  health: {
    title: "Здоровье",
    value: computed(() => props.indicatorsData.health.value),
    decrease: 1,
    speed: 3000,
  },

  fatigue: {
    title: "Усталось",
    value: computed(() => props.indicatorsData.fatigue.value),
    decrease: 1,
    speed: 6000,
  },
});

function decreaseIndicator(indicator) {
  const temp = props.indicatorsData;
  temp[indicator].value -= indicators[indicator].decrease;
  if (temp[indicator].value < 0) temp[indicator].value = 0;

  updateDoc(doc(db, "users", logs.uid), {
    indicators: temp,
  });
}

for (let indicator in indicators) {
  setInterval(() => {
    if (props.indicatorsData[indicator].value > 0) {
      let flag = false;
      if (indicator === "health") {
        for (let indicator in props.indicatorsData) {
          if (
            props.indicatorsData[indicator].value < 50 &&
            indicator !== "health"
          ) {
            flag = true;
            break;
          }
        }

        if (flag) {
          decreaseIndicator(indicator);
        }
      } else {
        decreaseIndicator(indicator);
      }
    }
  }, indicators[indicator].speed);
}
</script>

<template>
  <div class="indicators">
    <div class="level-wrap">
      <div class="level">{{ experience.level }}</div>
      <div class="text-and-progress">
        <p>Опыт питомца</p>
        <progress
          :max="experience.limit"
          :value="experience.value"
          class=""
        ></progress>
      </div>
    </div>

    <div class="stats">
      <div
        v-for="indicator in indicators"
        :key="indicator.title"
        class="text-and-progress"
      >
        <p>{{ indicator.title }}</p>
        <progress :value="indicator.value" max="100"></progress>
      </div>
    </div>
  </div>
</template>

<style scoped>
.indicators {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(112, 146, 190);
  padding: 10px 5%;
}

.level-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.level {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 10px;
  border-radius: 15px;
  border: 2px solid white;
  margin-right: 20px;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-and-progress {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
}
</style>
