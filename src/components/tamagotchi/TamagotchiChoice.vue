<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

const modules = [Navigation];
</script>

<template>
  <Swiper :modules="modules" :navigation="true" class="mySwiper">
    <SwiperSlide>
      <div>
        <img alt="Собака" src="@/assets/img/dog.png" />
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div>
        <img alt="Кошка" src="@/assets/img/cat.png" />
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div>
        <img alt="Мышь" src="@/assets/img/mouse.png" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
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
</style>
