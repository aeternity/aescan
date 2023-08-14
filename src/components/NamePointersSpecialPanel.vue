<template>
  <app-panel class="name-pointers-special-panel">
    <template #heading>
      SPECIAL POINTERS
    </template>
    <table>
      <tbody>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            Account
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.account"
              :to="`/accounts/${name.specialPointers.account}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.account }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
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
            State Channel
            <hint-tooltip>
              {{ namesHints.channelPointer }}
            </hint-tooltip>
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.channel"
              :to="`/state-channels/${name.specialPointers.channel}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.channel }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
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
            Smart Contract
            <hint-tooltip>
              {{ namesHints.contractPointer }}
            </hint-tooltip>
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.contract"
              :to="`/contracts/${name.specialPointers.contract}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.contract }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
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
            Oracle
            <hint-tooltip>
              {{ namesHints.oraclePointer }}
            </hint-tooltip>
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.oracle"
              :to="`/oracles/${name.specialPointers.oracle}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.oracle }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
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
import HintTooltip from '@/components/HintTooltip'
import AppPanel from '@/components/AppPanel'
import { useNameDetailsStore } from '@/stores/nameDetails'
import { formatEllipseHash } from '@/utils/format'
import AppLink from '@/components/AppLink'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
.name-pointers-special-panel {
  &__data {
    text-align: right;
  }

  &__link-text {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__link-text-ellipse {
    @media (--desktop) {
      display: none;
    }
  }

  &__table-header {
    border-bottom: 1.5px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
