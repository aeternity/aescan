<template>
  <app-panel class="name-pointers-custom-panel">
    <template #heading>
      CUSTOM POINTERS
      <hint-tooltip>
        {{ namesHints.customPointers }}
      </hint-tooltip>
    </template>
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
          <td>{{ pointer.key }}</td>
          <td>
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
import HintTooltip from '@/components/HintTooltip'
import AppPanel from '@/components/AppPanel'
import { useNameDetailsStore } from '@/stores/nameDetails'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
.name-pointers-custom-panel {
  &__header {
    padding: var(--space-1) 0;
    border-bottom: 1px solid var(--color-midnight-25);
  }
}
</style>
