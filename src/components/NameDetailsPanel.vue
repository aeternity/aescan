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
              <span class="name-details-panel__link-text">
                {{ name.owner }}
              </span>
              <span class="name-details-panel__link-text-ellipse">
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
              <span class="name-details-panel__link-text">
                {{ name.bidder }}
              </span>
              <span class="name-details-panel__link-text-ellipse">
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
            {{ formatAePrice(name.bid) }}
          </td>
        </tr>
        <tr
          v-if="isNameActive"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Owned Since
            <hint-tooltip>
              {{ namesHints.ownedSince }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <datetime-label :datetime="name.activated"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ nameStatusLabel }}
            <hint-tooltip>
              {{ namesHints[nameStatusHint] }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${name.expirationHeight}`">
              {{ name.expirationHeight }}
            </app-link>
            (
            <datetime-label :datetime="name.expiration"/>
            )
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
import { formatAePrice, formatEllipseHash } from '@/utils/format'
import DatetimeLabel from '@/components/DatetimeLabel'

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
  } else if (isNameExpired.value) {
    return 'expired'
  } else if (isNameActive.value) {
    return 'expires'
  }
})
const isNameExpired = computed(() =>
  name.value.status === 'name' && !name.value.active,
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
  &__name {
    overflow-wrap: anywhere;
    margin-bottom: var(--space-1);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

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
    border-bottom: 1.5px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
