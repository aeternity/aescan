<template>
  <div
    :class="[
      'accordion',
      { 'accordion--disabled' : isDisabled }]">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion__item">
      <header
        :class="[
          'accordion__header',
          {'accordion__header--expanded' : accordionMap[index] }]"
        @click="toggle(index)">
        {{ item.name }}
      </header>
      <div
        v-show="accordionMap[index]"
        class="accordion__content">
        <slot
          :item="{item, index}"
          name="item"/>
      </div>
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
    default: false,
  },
})

const accordionItems = ref(props.items)

const accordionMap = ref(Array(accordionItems.value.length).fill(true))
// todo glue together
// todo switch to false
const toggle = index => {
  accordionMap.value[index] = !accordionMap.value[index]
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
  }

  /*todo animate*/

}

</style>
