<template>
  <div class="tabs">
    <ul class="tabs__navigation">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'tabs__item',
          { 'tabs__item--active': activeTabIndex === index },
        ]"
        @click="selectTab(index)">
        {{ tab.title }}
      </li>
    </ul>
    <slot/>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:model-value'])

const activeTabIndex = props.modelValue ? useVModel(props, 'modelValue', emit): ref(0)
const tabs = ref([])

provide('registerTab', tab => tabs.value.push(tab))

watch(
  () => props.modelValue,
  newValue => selectTab(newValue),
  { immediate: true },
)

onMounted(() => {
  tabs.value[activeTabIndex.value].isActive = true
})

function selectTab(index) {
  activeTabIndex.value = index

  tabs.value.forEach((tab, index) => {
    tab.isActive = index === activeTabIndex.value
  })
}
</script>

<style scoped>
.tabs {
  @media (--desktop) {
    padding-top: 0;
  }

  &__navigation {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: var(--space-0);
    list-style: none;
    margin-bottom: var(--space-2);
  }

  &__item {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding: var(--space-1);
    background: var(--color-midnight-15);
    color: var(--color-gray);
    border-radius: 4px;
    margin-bottom: 3px;

    @media (--desktop) {
      font-size: 16px;
      line-height: 24px;
    }

    &--active {
      margin-bottom: 0;
      color: var(--color-midnight);
      border-radius: 4px 4px 0 0;
      border-bottom: 3px solid var(--color-fire);
      background: var(--color-white);
    }
  }
}
</style>
