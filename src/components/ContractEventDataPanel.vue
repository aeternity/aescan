<template>
  <app-panel class="contract-event-data-panel">
    <div class="contract-event-data-panel__heading">
      Arguments
    </div>
    <dl>
      <template
        v-for="(arg, index) in event.data"
        :key="index">
        <dt class="contract-event-data-panel_term">
          [arg{{ index }}]:
        </dt>
        <dd class="contract-event-data-panel__value">
          {{ arg }}
        </dd>
      </template>
    </dl>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.contract-event-data-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

  &__heading {
    font-weight: 700;
    letter-spacing: 0.015em;
    margin-bottom: var(--space-3);
  }

  &__term {
    height: 16px;
  }

  &__value {
    word-break: break-all;
  }
}
</style>
