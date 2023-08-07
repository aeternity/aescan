<template>
  <div class="panel">
    <!--    todo a co  <panel-header-->
    <header
      v-if="$slots.heading"
      class="panel__header">
      <h2 class="panel__heading h3">
        <slot name="heading"/>
      </h2>
      <slot name="header"/>
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
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>
