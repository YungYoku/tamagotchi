<script setup>
import dog from "@/assets/img/dog2.png";
import cat from "@/assets/img/cat2.png";
import mouse from "@/assets/img/mouse.png";
import heal from "@/assets/img/heal.png";

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
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
  {
    src: heal,
    alt: "Лечение",
  },
];
</script>

<template>
  <div class="person">
    <img
      :alt="tamagotchis[props.index - 1].alt"
      :src="tamagotchis[props.index - 1].src"
    />

    <div class="actions">
      <button v-for="action in actions" :key="action.alt">
        <img :alt="action.alt" :src="action.src" />
      </button>
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

.actions button {
  width: 60px;
  height: 60px;
  margin: 0 5px;
}

.actions button img {
  width: 60px;
  height: 60px;
}
</style>
