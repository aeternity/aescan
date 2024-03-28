<template>
  <app-panel
    v-if="name"
    class="name-details-panel">
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
            <hint-tooltip>
              {{ isNameExpired ? namesHints.lastOwner : namesHints.owner }}
            </hint-tooltip>
            {{ isNameExpired ? "Last Owner" : "Owner" }}
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
            <hint-tooltip>
              {{ namesHints.bidder }}
            </hint-tooltip>
            Highest Bidder
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
            <hint-tooltip>
              {{ namesHints.bid }}
            </hint-tooltip>
            Highest Bid
          </th>
          <td class="name-details-panel__data">
            {{ formatAePrice(name.bid) }}
          </td>
        </tr>
        <tr
          v-if="isNameActive"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints.ownedSince }}
            </hint-tooltip>
            Owned Since
          </th>
          <td class="name-details-panel__data">
            <datetime-label :datetime="name.activated"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints[nameStatusHint] }}
            </hint-tooltip>
            {{ nameStatusLabel }}
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
            <hint-tooltip>
              {{ namesHints.status }}
            </hint-tooltip>
            Status
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
    @media (--desktop) {
      width: 400px;
    }
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    text-align: left;
  }

  &__name {
    overflow-wrap: anywhere;
  }
}
</style>
