<script setup>
import dog from "@/assets/img/dog2.png";
import cat from "@/assets/img/cat2.png";
import mouse from "@/assets/img/mouse.png";
import heal from "@/assets/img/heal.png";
import kfc from "@/assets/img/kfc.png";
import egg from "@/assets/img/egg.png";
import soup from "@/assets/img/soup.png";
import shampoo from "@/assets/img/shampoo.png";
import sponge from "@/assets/img/sponge.png";
import mask from "@/assets/img/mask.png";
import bed from "@/assets/img/bed.png";
import ball from "@/assets/img/ball.png";
import { computed, reactive } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { useLogsStore } from "../../stores/logs";

const logs = useLogsStore();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  indicatorsData: {
    type: Object,
    required: true,
  },
});

const tamagotchis = [
  {
    src: dog,
    alt: "Собака",
  },
  {
    src: cat,
    alt: "Кошка",
  },
  {
    src: mouse,
    alt: "Мышь",
  },
];

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

const indicators = reactive({
  happiness: {
    value: computed(() => props.indicatorsData.happiness.value),
    power: 7,
    exp: 5,
  },
  hunger: {
    value: computed(() => props.indicatorsData.hunger.value),
    power: 7,
    exp: 5,
  },
  purity: {
    value: computed(() => props.indicatorsData.purity.value),
    power: 7,
    exp: 5,
  },
  health: {
    value: computed(() => props.indicatorsData.health.value),
    power: 10,
    exp: 10,
  },
  fatigue: {
    value: computed(() => props.indicatorsData.fatigue.value),
    power: 90,
    exp: 15,
  },
});

const actions = [
  [
    {
      src: ball,
      alt: "Мяч",
      increase: () => increase("happiness"),
    },
  ],

  [
    {
      src: kfc,
      alt: "KFC",
      increase: () => increase("hunger"),
    },
    {
      src: egg,
      alt: "Яичница",
      increase: () => increase("hunger"),
    },
    {
      src: soup,
      alt: "Борщ",
      increase: () => increase("hunger"),
    },
  ],

  [
    {
      src: shampoo,
      alt: "Шампунь",
      increase: () => increase("purity"),
    },
    {
      src: sponge,
      alt: "Мочалка",
      increase: () => increase("purity"),
    },
    {
      src: mask,
      alt: "Маска для лица",
      increase: () => increase("purity"),
    },
  ],

  [
    {
      src: heal,
      alt: "Лечение",
      increase: () => increase("health"),
    },
  ],

  [
    {
      src: bed,
      alt: "Сон",
      increase: () => increase("fatigue"),
    },
  ],
];
</script>

<template>
  <div class="person">
    <img
      :alt="tamagotchis[props.index - 1].alt"
      :src="tamagotchis[props.index - 1].src"
    />

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
  </div>
</template>

<style scoped>
.person {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.actions {
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
