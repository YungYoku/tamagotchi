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

const props = defineProps({
  index: {
    type: Number,
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

const actions = [
  [
    {
      src: ball,
      alt: "Мяч",
    },
  ],

  [
    {
      src: kfc,
      alt: "KFC",
    },
    {
      src: egg,
      alt: "Яичница",
    },
    {
      src: soup,
      alt: "Борщ",
    },
  ],

  [
    {
      src: shampoo,
      alt: "Шампунь",
    },
    {
      src: sponge,
      alt: "Мочалка",
    },
    {
      src: mask,
      alt: "Маска для лица",
    },
  ],

  [
    {
      src: heal,
      alt: "Лечение",
    },
  ],

  [
    {
      src: bed,
      alt: "Сон",
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
        <button v-for="action in options" :key="action.alt">
          <img :alt="action.alt" :src="action.src" />
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

.person img {
  margin-bottom: 60px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
}

.actions > div button {
  width: 60px;
  height: 60px;
  margin: 0 5px;
}

.actions > div button img {
  width: 60px;
  height: 60px;
}
</style>
