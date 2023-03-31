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

<script>
export default {
  name: 'AppTabs',
  provide() {
    return {
      registerTab: tab => this.tabs.push(tab),
    }
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      tabs: [],
      activeTabIndex: this.modelValue,
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.selectTab(newValue)
      },
    },
  },
  mounted() {
    this.tabs[this.activeTabIndex].isActive = true
  },
  methods: {
    selectTab(index) {
      this.activeTabIndex = index

      this.tabs.forEach((tab, index) => {
        tab.isActive = index === this.activeTabIndex
      })

      this.$emit('update:modelValue', this.activeTabIndex)
    },
  },
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
