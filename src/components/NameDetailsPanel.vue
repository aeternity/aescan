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
          <td class="name-details-panel__data">
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
          <td class="name-details-panel__data">
            <app-link :to="`/accounts/${name.owner}`">
              {{ name.owner }}
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
              {{ name.bidder }}
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
            <price-label :price="name.bid"/>
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
          <td class="name-details-panel__data">
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
          <td class="name-details-panel__data">
            <timestamp-label
              :timestamp="name.activated"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints[name.stateString + 'Height'] }}
            </hint-tooltip>
            {{ name.stateLabel }} Height
          </th>
          <td class="name-details-panel__data">
            <app-link
              :to="`/keyblocks/${name.auctionEndsHeight || name.expirationHeight}`">
              {{ name.auctionEndsHeight || name.expirationHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="name-details-panel__row">
          <th class="name-details-panel__table-header">
            <hint-tooltip>
              {{ namesHints[name.stateString + 'Time'] }}
            </hint-tooltip>
            {{ name.stateLabel }}
          </th>
          <td class="name-details-panel__data">
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
          <td class="name-details-panel__data">
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
import { namesHints } from '@/utils/hints/namesHints'

const { name } = storeToRefs(useNameDetailsStore())
const states = name.value.states

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
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: var(--space-1);
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    white-space: wrap;
    word-break: break-all;
    padding-left: 28px;
    padding-top: var(--space-0);

    @media (--mobile) {
      padding-top: var(--space-1);
      display: table-cell;
    }
  }
}
</style>
