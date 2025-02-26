<template>
  <app-panel class="name-pointers-custom-panel">
    <template #title>
      CUSTOM POINTERS
      <hint-tooltip>
        {{ namesHints.customPointers }}
      </hint-tooltip>
    </template>
    <table>
      <thead>
        <tr>
          <th class="name-pointers-custom-panel__header">
            Key
          </th>
          <th class="name-pointers-custom-panel__header">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pointer, index) in name.customPointers"
          :key="index">
          <td>{{ pointer.key }}</td>
          <td>
            <value-hash-ellipsed
              v-if="!pointer.isRawPointer"
              :hash="pointer.pointer"
              :link-to="`/accounts/${pointer.pointer}`"/>
            <template v-else>
              {{ pointer.pointer }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
.name-pointers-custom-panel__header:first-child {
  @media (--desktop) {
    width: var(--detail-column-width);
  }
}
</style>
