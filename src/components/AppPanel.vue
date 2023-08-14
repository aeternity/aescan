<template>
  <div class="panel">
    <!--    todo a co  <panel-header-->
    <header
      v-if="$slots.heading"
      class="panel__header">
      <h2 class="panel__heading h3">
        <slot name="heading"/>
      </h2>
      <div class="panel__container">
        <slot name="header"/>
      </div>
    </header>
    <slot/>
  </div>
</template>

<script setup lang="ts"></script>
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
    /*todo fix to variables*/
    padding: 8px 0 0 0;
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 8px 0 var(--space-4);
    }
  }

  &__heading {
    margin-bottom: var(--space-1);
  }

  &__container {
    padding: 8px 0;
    display: flex;
    gap: 8px;

    @media (--desktop) {
      padding: 0;
    }

    &:empty {
      padding: 0;
    }
  }
}
</style>
