<script setup>
import { computed, reactive } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";
import { getAmountOfHoursFromYearStart } from "@/js/api";

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
  regDate: {
    type: Number,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
});

let hours = computed(() => getAmountOfHoursFromYearStart() - props.regDate);

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
    titleEng: "happiness",
    value: computed(() => props.indicatorsData.happiness.value),
    decrease: 1,
    speed: 1500,
  },

  hunger: {
    title: "Голод",
    titleEng: "hunger",
    value: computed(() => props.indicatorsData.hunger.value),
    decrease: 1,
    speed: 2000,
  },

  purity: {
    title: "Чистота",
    titleEng: "purity",
    value: computed(() => props.indicatorsData.purity.value),
    decrease: 1,
    speed: 4000,
  },

  health: {
    title: "Здоровье",
    titleEng: "health",
    value: computed(() => props.indicatorsData.health.value),
    decrease: 1,
    speed: 3000,
  },

  fatigue: {
    title: "Усталось",
    titleEng: "fatigue",
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
  const interval = setInterval(() => {
    if (props.indicatorsData[indicator].value > 0) {
      if (props.indicatorsData.health.value === 0) {
        clearInterval(interval);
      }
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
        <p>Опыт</p>
        <progress
          :max="experience.limit"
          :value="experience.value"
          class="progresses level-ind"
        ></progress>
      </div>
      <div class="lifeTime">Время жизни: {{ hours }} часов</div>
      <div class="coins">
        <img alt="" class="coin" src="../../assets/img/coin.png" />
        {{ props.coins }}
      </div>
    </div>

    <div class="stats">
      <div
        v-for="indicator in indicators"
        :key="indicator.title"
        class="text-and-progress"
      >
        <p>{{ indicator.title }}</p>
        <progress
          :class="[indicator.titleEng]"
          :value="indicator.value"
          class="progresses"
          max="100"
        ></progress>
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
  /*background-color: rgb(112, 146, 190);*/
  padding: 10px 5%;
  background: linear-gradient(
    to bottom,
    rgb(112, 146, 190) 20%,
    rgb(153, 217, 234)
  );
}

.level-wrap {
  width: 50%;
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
  width: 50%;
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

.level-ind::-webkit-progress-value {
  background: gold;
  animation: background 3s infinite alternate;
  box-shadow: 0 -20px 10px -12px lawngreen inset;
}

@keyframes background {
  50% {
    background: skyblue;
    box-shadow: 0 0 0 0 yellowgreen inset;
  }
}

.progresses {
  width: 100px;
}

.progresses::-webkit-progress-bar {
  border-radius: 10px;
  background-color: #c0c0c0;
  overflow: hidden;
}

.progresses::-webkit-progress-value {
  border-radius: 10px;
}

.health::-webkit-progress-value {
  background: #dc143c;
  border-radius: 10px;
}

.purity::-webkit-progress-value {
  background: #4169e1;
  border-radius: 10px;
}

.hunger::-webkit-progress-value {
  background: #ff8c00;
  border-radius: 10px;
}

.happiness::-webkit-progress-value {
  background: #ffff00;
  border-radius: 10px;
}

.fatigue::-webkit-progress-value {
  background: #d2b48c;
  border-radius: 10px;
}

.coins {
  display: flex;
  align-items: center;
  justify-content: center;
}

.coin {
  height: 20px;
  margin: 0 5px 0 20px;
}

@media (max-width: 1400px) {
  .indicators {
    flex-wrap: wrap;
  }

  .level-wrap,
  .stats {
    width: 100%;
    margin-top: 20px;
  }

  .stats {
  }
}
</style>
