<template>
  <app-panel class="name-pointers-custom-panel">
    <h3 class="name-pointers-custom-panel__heading">
      CUSTOM POINTERS
    </h3>
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

<script>
import { mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useNameDetailsStore } from '@/stores/nameDetails'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

export default {
  name: 'NamePointersCustomPanel',
  components: {
    ValueHashEllipsed,
    AppPanel,
  },
  computed: {
    ...mapState(useNameDetailsStore, ['name']),
  },
}
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
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.03em;
    margin-bottom: var(--space-1);
    @media (--desktop) {
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
