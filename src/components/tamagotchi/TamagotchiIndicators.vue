<script setup>
import { reactive } from "vue";
// const lifeTime = {
//   value: 0,
//   speed: 5000,
// };
//
// const experience = {
//   value: 0,
// };

const indicators = reactive({
  happiness: {
    title: "Счастье",
    action: "Покормить",
    value: 100,
    speed: 1000,
    increase: () => {
      if (indicators.happiness.value < 100) {
        indicators.happiness.value += 10;
      }
    },
  },
  purity: {
    title: "Чистота",
    action: "Помыть",
    value: 100,
    speed: 1000,
    increase: () => {
      if (indicators.purity.value < 100) {
        indicators.purity.value += 10;
      }
    },
  },
  health: {
    title: "Здоровье",
    action: "Вылечить",
    value: 100,
    speed: 1000,
    increase: () => {
      if (indicators.health.value < 100) {
        indicators.health.value += 10;
      }
    },
  },
  fatigue: {
    title: "Усталось",
    action: "Отправить спать",
    value: 100,
    speed: 1000,
    increase: () => {
      if (indicators.fatigue.value < 100) {
        indicators.fatigue.value += 10;
      }
    },
  },
});

for (let indicator in indicators) {
  setInterval(() => {
    if (indicators[indicator].value > 0) {
      indicators[indicator].value -= 10;
    }
  }, indicators[indicator].speed);
}
</script>

<template>
  <div class="indicators">
    <div v-for="indicator in indicators" :key="indicator.title">
      <div class="i-a-a-content">
        <button class="button button-eat" @click="indicator.increase">
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
