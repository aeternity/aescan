<template>
  <swiper
    v-if="slides?.length"
    :modules="modules"
    :loop="slides?.length > 1"
    :pagination="true"
    :space-between="48">
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="index">
      <slot
        name="slide"
        :slide-data="slide"/>
    </swiper-slide>
  </swiper>
  <blank-state
    v-else
    class="swiper__blank-state"/>
</template>

<script setup>
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import BlankState from '@/components/BlankState'

defineProps({
  slides: {
    type: Array,
    default: null,
  },
})

const modules = [Pagination]
</script>

<style>
.swiper-pagination {
  position: static;

  &-bullet {
    margin-top: var(--space-5) !important;
  }

  &-bullet-active {
    background: var(--color-midnight);
  }

  &__blank-state {
    margin-top: var(--space-3);
  }
}
</style>
