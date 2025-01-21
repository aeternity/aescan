<template>
  <app-panel class="name-pointers-special-panel">
    <template #title>
      SPECIAL POINTERS
    </template>
    <table>
      <tbody>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
            Account
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.account"
              :to="`/accounts/${name.specialPointers.account}`">
              <span class="u-hidden-mobile">
                {{ name.specialPointers.account }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.account) }}
              </span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            <hint-tooltip>
              {{ namesHints.channelPointer }}
            </hint-tooltip>
            State Channel
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.channel"
              :to="`/state-channels/${name.specialPointers.channel}`">
              <span class="u-hidden-mobile">
                {{ name.specialPointers.channel }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.channel) }}
              </span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            <hint-tooltip>
              {{ namesHints.contractPointer }}
            </hint-tooltip>
            Smart Contract
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.contract"
              :to="`/contracts/${name.specialPointers.contract}`">
              <span class="u-hidden-mobile">
                {{ name.specialPointers.contract }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.contract) }}
              </span>
            </app-link>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            <hint-tooltip>
              {{ namesHints.oraclePointer }}
            </hint-tooltip>
            Oracle
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.oracle"
              :to="`/oracles/${name.specialPointers.oracle}`">
              <span class="u-hidden-mobile">
                {{ name.specialPointers.oracle }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.oracle) }}
              </span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'
import { useNameDetailsStore } from '@/stores/nameDetails'
import { formatEllipseHash } from '@/utils/format'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
.name-pointers-special-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
