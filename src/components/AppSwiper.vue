<template>
  <swiper
    v-if="slides?.length"
    :modules="modules"
    :loop="slides?.length > 1"
    :pagination="{clickable: true}"
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

defineProps({
  slides: {
    type: Array,
    default: null,
  },
})

const modules = [Pagination]
</script>

<style>
.swiper {
  /* Themed pagination bullets — visible in both light and dark */
  --swiper-pagination-color: var(--brand);
  --swiper-pagination-bullet-inactive-color: var(--text-faint);
  --swiper-pagination-bullet-inactive-opacity: 0.6;
  --swiper-pagination-bullet-size: 8px;
  --swiper-pagination-bullet-horizontal-gap: 5px;
}

.swiper-pagination {
  position: static;

  &-bullet {
    margin-top: var(--space-2) !important;
  }

  &-bullet-active {
    background: var(--color-fire);
  }

  &__blank-state {
    margin-top: var(--space-3);
  }
}
</style>
