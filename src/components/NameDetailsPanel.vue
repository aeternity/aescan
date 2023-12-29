<template>
  <app-panel
    v-if="name"
    class="name-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <copy-chip
        class="name-details-panel__name"
        :label="name.name"/>
    </template>

    <table>
      <tbody>
        <tr
          v-if="name.status !== 'auction'"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ isNameExpired ? "Last Owner" : "Owner" }}
            <hint-tooltip>
              {{ isNameExpired ? namesHints.lastOwner : namesHints.owner }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link :to="`/accounts/${name.owner}`">
              <span class="u-hidden-mobile">
                {{ name.owner }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.owner) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr
          v-if="name.bidder"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Highest Bidder
            <hint-tooltip>
              {{ namesHints.bidder }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link :to="`/accounts/${name.bidder}`">
              <span class="u-hidden-mobile">
                {{ name.bidder }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.bidder) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr
          v-if="name.bid"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Highest Bid
            <hint-tooltip>
              {{ namesHints.bid }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <price-label
              class="name-details-panel__data"
              :price="name.bid"/>
          </td>
        </tr>
        <tr
          v-if="isNameActive"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Owned Since Height
            <hint-tooltip>
              {{ namesHints.ownedSinceHeight }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${name.expirationHeight}`">
              {{ name.activatedHeight }}
            </app-link>
          </td>
        </tr>
        <tr
          v-if="isNameActive"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Owned Since
            <hint-tooltip>
              {{ namesHints.ownedSinceTime }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <timestamp-label
              :timestamp="name.activated"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ nameStatusLabel }} Height
            <hint-tooltip>
              {{ namesHints[nameStatusHint + 'Height'] }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${name.expirationHeight}`">
              {{ name.expirationHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ nameStatusLabel }}
            <hint-tooltip>
              {{ namesHints[nameStatusHint + 'Time'] }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <timestamp-label
              :timestamp="name.expiration"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Status
            <hint-tooltip>
              {{ namesHints.status }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-chip :variant="labelVariant">
              {{ nameStatusText }}
            </app-chip>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'
import AppPanel from '@/components/AppPanel'
import AppLink from '@/components/AppLink'
import AppChip from '@/components/AppChip'
import CopyChip from '@/components/CopyChip'
import HintTooltip from '@/components/HintTooltip'
import { useNameDetailsStore } from '@/stores/nameDetails'
import { formatEllipseHash } from '@/utils/format'

const { name } = storeToRefs(useNameDetailsStore())

const labelVariant = computed(() =>
  name.value.active ? 'success' : 'error',
)
const nameStatusText = computed(() => {
  if (isNameInAuction.value) {
    return 'In auction'
  }

  return name.value.active ? 'Active' : 'Expired'
})
const nameStatusLabel = computed(() => {
  if (isNameInAuction.value) {
    return 'Ends'
  } else if (isNameExpired.value) {
    return 'Expired'
  } else if (isNameActive.value) {
    return 'Expires'
  }
})
const nameStatusHint = computed(() => {
  if (isNameInAuction.value) {
    return 'ends'
  } else if (isNameRevoked.value) {
    return 'revoked'
  } else if (isNameExpired.value) {
    return 'expired'
  } else if (isNameActive.value) {
    return 'expires'
  }
})
const isNameExpired = computed(() =>
  name.value.status === 'name' && !name.value.active,
)
const isNameRevoked = computed(() =>
  isNameExpired.value && name.value.isRevoked === true,
)
const isNameActive = computed(() =>
  name.value.active && name.value.activated,
)
const isNameInAuction = computed(() =>
  name.value.status === 'auction',
)

</script>

<style scoped>
.name-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__name {
    overflow-wrap: anywhere;
  }
}
</style>
