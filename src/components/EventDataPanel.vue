<template>
  <app-panel class="contract-event-data-panel">
    <div class="contract-event-data-panel__heading">
      Arguments
    </div>
    <dl>
      <template
        v-for="(argument, index) in args"
        :key="index">
        <dt class="contract-event-data-panel_term">
          [arg{{ index }}]:
        </dt>
        <dd class="contract-event-data-panel__value">
          {{ argument }}
          <copy-button
            :clipboard-text="argument"
            size="sm"/>
        </dd>
      </template>
    </dl>
  </app-panel>
</template>

<script setup>
import AppPanel from '@/components/AppPanel'
import CopyButton from '@/components/CopyButton'

defineProps({
  args: {
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
    color: var(--color-midnight-55);
    display: flex;
    gap: var(--space-0);
    word-break: break-all;
  }
}
</style>
