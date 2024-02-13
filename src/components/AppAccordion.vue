<template>
  <div
    :class="[
      'accordion',
      { 'accordion--disabled' : isDisabled }]">
    <div
      v-for="(item, index) in accordionItems"
      :key="index"
      class="accordion__item">
      <header
        :class="[
          'accordion__header',
          {'accordion__header--expanded' : item.isExpanded }]"
        @click="toggle(index)">
        <h4>
          {{ item.name }}
        </h4>
      </header>

      <transition name="accordion__content">
        <div
          v-show="item.isExpanded"
          class="accordion__content">
          <slot
            :content="{item, index}"
            name="content"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: true,
  },
})

const accordionItems = ref(props.items.map(item => ({ ...item, isExpanded: false })))

function toggle(index) {
  accordionItems.value[index].isExpanded = !accordionItems.value[index].isExpanded
}
</script>

<style scoped>
.accordion {
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__item {
    border: 1px solid var(--color-gray);
    border-radius: 8px;
    margin-bottom: var(--space-4);
  }

  &__header {
    background: var(--color-snow);
    padding: var(--space-1);
    border-radius: 8px;
    cursor: pointer;

    &--expanded {
      border-bottom: 1px solid var(--color-gray);
      border-radius: 8px 8px 0 0;
    }
  }

  &__content {
    padding: var(--space-1);

    &-enter-active, &-leave-active {
      transition: max-height 0.08s ease;
    }

    &-enter-from, &-leave-to {
      max-height: 0;
      overflow: hidden;
    }

    &-enter-to, &-leave-from {
      max-height: 1000px;
      overflow: hidden;
    }
  }
}
</style>
