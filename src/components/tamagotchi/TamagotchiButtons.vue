<script setup>
import { db } from "@/main";
import { doc, updateDoc } from "firebase/firestore";
import { getCurrentDate } from "@/js/api";
import heal from "@/assets/img/heal.png";
import kfc from "@/assets/img/kfc.png";
import egg from "@/assets/img/egg.png";
import soup from "@/assets/img/soup.png";
import shampoo from "@/assets/img/shampoo.png";
import sponge from "@/assets/img/sponge.png";
import mask from "@/assets/img/mask.png";
import bed from "@/assets/img/bed.png";
import ball from "@/assets/img/ball.png";

const props = defineProps({
  experience: {
    type: Number,
    required: true,
  },
  indicatorsData: {
    type: Object,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
});

import { useLogsStore } from "@/stores/logs";

const logs = useLogsStore();

function increase(indicator, value, exp, cost = 0) {
  if (
    props.indicatorsData.hasOwnProperty(indicator) &&
    props.indicatorsData[indicator].value < 100 &&
    props.coins - cost > 0
  ) {
    const temp = props.indicatorsData;
    temp[indicator].value += value;
    if (temp[indicator].value > 100) temp[indicator].value = 100;
    temp[indicator].lastIncrease = getCurrentDate();

    const experience = props.experience + exp;
    const coins = props.coins - cost < 0 ? props.coins : props.coins - cost;

    updateDoc(doc(db, "users", logs.uid), {
      experience,
      coins,
      indicators: temp,
    });
  }
}

const actions = [
  [
    {
      src: ball,
      alt: "Мяч",
      increase: () => increase("happiness", 7, 5),
    },
  ],

  [
    {
      src: egg,
      alt: "Яичница",
      increase: () => increase("hunger", 7, 5),
    },
    {
      src: soup,
      alt: "Борщ",
      increase: () => increase("hunger", 12, 8, 5),
    },
    {
      src: kfc,
      alt: "KFC",
      increase: () => increase("hunger", 20, 13, 11),
    },
  ],

  [
    {
      src: sponge,
      alt: "Мочалка",
      increase: () => increase("purity", 7, 5),
    },
    {
      src: shampoo,
      alt: "Шампунь",
      increase: () => increase("purity", 12, 8, 5),
    },
    {
      src: mask,
      alt: "Маска для лица",
      increase: () => increase("purity", 20, 13, 11),
    },
  ],

  [
    {
      src: heal,
      alt: "Лечение",
      increase: () => increase("health", 10, 10),
    },
  ],

  [
    {
      src: bed,
      alt: "Сон",
      increase: () => increase("fatigue", 90, 15),
    },
  ],
];
</script>

<template>
  <div class="actions">
    <div v-for="(options, i) in actions" :key="options[0].alt + i">
      <button
        v-for="action in options"
        :key="action.alt"
        @click="action.increase"
      >
        <img :alt="action.alt" :src="action.src" />
        {{ action.alt }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.actions {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions > p {
  margin: 0;
}

.actions > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
}

.actions > div button {
  width: 60px;
  height: 60px;
  margin: 0 15px;
}

.actions > div button img {
  width: 60px;
  height: 60px;
}
</style>
