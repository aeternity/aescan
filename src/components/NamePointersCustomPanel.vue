<template>
  <app-panel class="name-pointers-custom-panel">
    <h2 class="name-pointers-custom-panel__heading h3">
      CUSTOM POINTERS
      <hint-tooltip>
        {{ namesHints.customPointers }}
      </hint-tooltip>
    </h2>
    <table>
      <tbody>
        <tr>
          <th class="name-pointers-custom-panel__header">
            Key
          </th>
          <th class="name-pointers-custom-panel__header">
            Value
          </th>
        </tr>
        <tr
          v-for="(pointer, index) in name.customPointers"
          :key="index">
          <th>{{ pointer.key }}</th>
          <td class="name-pointers-custom-panel__data">
            <value-hash-ellipsed
              :hash="pointer.pointer"
              :link-to="`/accounts/${pointer.pointer}`"/>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'
import HintTooltip from '~/components/HintTooltip'
import AppPanel from '@/components/AppPanel'
import { useNameDetailsStore } from '@/stores/nameDetails'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
.name-pointers-custom-panel {
  padding: var(--space-4) var(--space-1) var(--space-3);
  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-3);
  }

  &__header {
    padding: var(--space-1) 0;
  }

  &__heading {
    margin-bottom: var(--space-1);
  }
}
</style>
