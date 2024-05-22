<template>
  <app-panel class="name-details-panel">
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
          v-if="state !== 'auction'"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ state === 'expired' ? "Last Owner" : "Owner" }}
            <hint-tooltip>
              {{ state === 'expired' ? namesHints.lastOwner : namesHints.owner }}
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
            {{ formatAePrice(name.bid) }}
          </td>
        </tr>
        <tr
          v-if="state === 'active'"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Owned Since Height
            <hint-tooltip>
              {{ namesHints.ownedSinceHeight }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${name.activatedHeight}`">
              {{ name.activatedHeight }}
            </app-link>
          </td>
        </tr>
        <tr
          v-if="state === 'active'"
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
            {{ stateLabel }} Height
            <hint-tooltip>
              {{ namesHints[state + 'Height'] }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${ name.acutionEndsHeight || name.expirationHeight}`">
              {{ name.auctionEndsHeight || name.expirationHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            {{ stateLabel }}
            <hint-tooltip>
              {{ namesHints[state + 'Time'] }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <timestamp-label
              :timestamp="name.auctionEnds || name.expiration"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            Status
            <hint-tooltip>
              {{ namesHints.state }}
            </hint-tooltip>
          </th>
          <td class="name-details-panel__data">
            <app-chip :variant="labelVariant">
              {{ stateText }}
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

const { name } = storeToRefs(useNameDetailsStore())
const state = name.value.state

const labelVariant = computed(() => state === 'active' ? 'success' : 'error')

const stateLabel = computed(() => {
  const labels = {
    auction: 'Ends',
    active: 'Expires',
    expired: 'Expired',
    revoked: 'Expired',
  }
  return labels[state]
})

const stateText = computed(() => {
  const texts = {
    auction: 'In auction',
    active: 'Active',
    expired: 'Expired',
    revoked: 'Expired',
  }
  return texts[state]
})

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
