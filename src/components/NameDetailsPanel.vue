<template>
  <app-panel class="name-details-panel">
    <table>
      <tbody>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints.nameId }}
            </hint-tooltip>
            Name
          </th>
          <td>
            <copy-chip :label="name.name"/>
          </td>
        </tr>
        <tr
          v-if="!states.includes('auction')"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ states.includes('expired') ? namesHints.lastOwner : namesHints.owner }}
            </hint-tooltip>
            {{ states.includes('expired') ? "Last Owner" : "Owner" }}
          </th>
          <td>
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
          <td>
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
          <td>
            <price-label
              class="name-details-panel__data"
              :price="name.bid"/>
          </td>
        </tr>
        <tr
          v-if="states.includes('active')"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints.ownedSinceHeight }}
            </hint-tooltip>
            Owned Since Height
          </th>
          <td>
            <app-link
              :to="`/keyblocks/${name.activatedHeight}`">
              {{ name.activatedHeight }}
            </app-link>
          </td>
        </tr>
        <tr
          v-if="states.includes('active')"
          class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints.ownedSinceTime }}
            </hint-tooltip>
            Owned Since
          </th>
          <td>
            <timestamp-label
              :timestamp="name.activated"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints[stateLabel.toLowerCase() + 'Height'] }}
            </hint-tooltip>
            {{ stateLabel }} Height
          </th>
          <td>
            <app-link
              :to="`/keyblocks/${name.auctionEndsHeight || name.expirationHeight}`">
              {{ name.auctionEndsHeight || name.expirationHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints[stateLabel.toLowerCase() + 'Time'] }}
            </hint-tooltip>
            {{ stateLabel }}
          </th>
          <td>
            <timestamp-label
              :timestamp="name.auctionEnds || name.expiration"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints.state }}
            </hint-tooltip>
            Status
          </th>
          <td>
            <div class="name-details-panel__container">
              <app-chip
                v-for="state in states"
                :key="state"
                :variant="getVariant(state)">
                {{ getLabel(state) }}
              </app-chip>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'
import { formatEllipseHash } from '@/utils/format'

const { name } = storeToRefs(useNameDetailsStore())
const states = name.value.states

const stateLabel = computed(() => {
  if (states.includes('auction')) {
    return 'Ends'
  }
  if (states.includes('revoked')) {
    return 'Revoked'
  }
  if (states.includes('expired')) {
    return 'Expired'
  }
  return 'Expires'
})

function getVariant(state) {
  if (state.includes('auction')) {
    return 'primary'
  }
  if (state.includes('revoked')) {
    return 'error'
  }
  if (state.includes('expired')) {
    return 'error'
  }
  return 'success'
}

function getLabel(state) {
  if (state.includes('auction')) {
    return 'In Auction'
  }
  if (state.includes('revoked')) {
    return 'Revoked'
  }
  if (state.includes('expired')) {
    return 'Expired'
  }

  return 'Active'
}

</script>

<style scoped>
.name-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__container {
    display: flex;
    gap: var(--space-1);
  }
}
</style>
