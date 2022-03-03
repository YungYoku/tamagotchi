<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import dog from "@/assets/img/dog2.png";
import cat from "@/assets/img/cat2.png";
import mouse from "@/assets/img/mouse.png";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";

const modules = [Navigation];

const logs = useLogsStore();

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

function pick(i) {
  updateDoc(doc(db, "users", logs.uid), {
    persChoice: i,
  });
}
</script>

<template>
  <Swiper :modules="modules" :navigation="true" class="mySwiper">
    <SwiperSlide v-for="(tamagotchi, i) in tamagotchis" :key="tamagotchi.alt">
      <div>
        <img :alt="tamagotchi.alt" :src="tamagotchi.src" class="tamagotchi" />
        <button class="pick" @click="pick(i + 1)">Выбрать</button>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tamagotchi {
}

.pick {
  position: relative;
  padding: 10px;
  border-radius: 5px;
  background-color: #007aff;
  margin-top: 40px;
  z-index: 3;
}
</style>
