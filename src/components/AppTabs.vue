<template>
  <div class="tabs">
    <ul class="tabs__navigation">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'tabs__item',
          {'tabs__item--active': activeTabIndex === index},
        ]"
        @click="selectTab(index)">
        {{ tab.title }}
        <verified-icon v-if="tab.hasVerifiedIcon"/>
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
    default: null,
  },
})

provide('registerTab', tab => tabs.value.push(tab))

const emit = defineEmits(['update:modelValue'])
const tabs = ref([])

const activeTabIndex = props.modelValue === null ? ref(0) : useVModel(props, 'modelValue', emit)

watch(
  () => props.modelValue,
  () => selectTab(activeTabIndex.value),
)

onMounted(() => {
  selectTab(preselectedTabIndex.value || activeTabIndex.value)
})

const preselectedTabIndex = computed(() => {
  const index = tabs.value.findIndex(tab => tab.isPreselected)
  return index === -1 ? null : index
})

function selectTab(tabIndex) {
  activeTabIndex.value = tabIndex
  tabs.value.forEach((tab, index) => {
    tab.isActive = index === tabIndex
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
    overflow-x: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-0);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding: var(--space-1);
    background: #dededeA5;
    color: var(--color-midnight-55);
    border-radius: 4px 4px 0 0;
    letter-spacing: 0.003em;
    transition: none;
    white-space: nowrap;

    @media (--desktop) {
      font-size: 16px;
      line-height: 24px;
    }

    &--active {
      color: var(--color-midnight);
      background: var(--color-white);
    }
  }
}
</style>
