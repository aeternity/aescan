<template>
  <div class="panel">
    <panel-header
      :level="level"
      :icon-name="iconName"
      :show-all-link="showAllLink">
      <template
        v-if="!!$slots.header"
        #header>
        <slot name="header"/>
      </template>
      <template
        v-if="!!$slots.title"
        #title>
        <slot name="title"/>
      </template>
      <template
        v-if="!!$slots.tooltip"
        #tooltip>
        <slot name="tooltip"/>
      </template>

      <template
        v-if="!!$slots.end"
        #end>
        <slot name="end"/>
      </template>

      <!--      <header-->
      <!--        v-if="$slots.heading"-->
      <!--        class="panel__header">-->
      <!--        <h2 class="panel__heading h3">-->
      <!--          <slot name="heading"/>-->
      <!--        </h2>-->
      <!--        <div class="panel__container">-->
      <!--          <slot name="header"/>-->
      <!--        </div>-->
      <!--      </header>-->
    </panel-header>
    <slot/>
  </div>
</template>
<!--todo pass slots-->

<script setup>

defineProps({
  level: {
    type: String,
    default: 'h3',
    validator: val => ['h2', 'h3', 'h4', 'h5'].includes(val),
  },
  iconName: {
    type: String,
    default: null,
  },
  showAllLink: {
    type: String,
    default: null,
  },
})
</script>

<style scoped>
.panel {
  max-width: 100%;
  background: var(--color-white);
  border-radius: 8px;
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__header {
    padding: var(--space-1) 0 0 0;
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: var(--space-1) 0 var(--space-4);
    }
  }

  &__heading {
    margin-bottom: var(--space-1);
  }

  &__container {
    padding: var(--space-1) 0;
    display: flex;
    gap: var(--space-1);

    @media (--desktop) {
      padding: 0;
    }

    &:empty {
      padding: 0;
    }
  }
}
</style>
