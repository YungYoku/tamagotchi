<script setup>
import dog from "@/assets/img/dog2.png";
import cat from "@/assets/img/cat2.png";
import mouse from "@/assets/img/mouse.png";

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
</script>

<template>
  <div class="person">
    <img
      :alt="tamagotchis[props.index - 1].alt"
      :src="tamagotchis[props.index - 1].src"
    />
  </div>
</template>

<style scoped>
.person {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
