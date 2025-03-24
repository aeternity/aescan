<template>
  <app-panel class="name-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints.nameId }}
            </hint-tooltip>
            Name
          </th>
          <td>
            <copy-chip :label="name.name"/>
          </td>
        </tr>
        <tr v-if="!states.includes('auction')">
          <th>
            <hint-tooltip>
              {{ states.includes('expired') ? namesHints.lastOwner : namesHints.owner }}
            </hint-tooltip>
            {{ states.includes('expired') ? "Last Owner" : "Owner" }}
          </th>
          <td>
            <app-link :to="`/accounts/${name.owner}`">
              {{ name.owner }}
            </app-link>
          </td>
        </tr>
        <tr v-if="name.bidder">
          <th>
            <hint-tooltip>
              {{ namesHints.bidder }}
            </hint-tooltip>
            Highest Bidder
          </th>
          <td>
            <app-link :to="`/accounts/${name.bidder}`">
              {{ name.bidder }}
            </app-link>
          </td>
        </tr>
        <tr v-if="name.bid">
          <th>
            <hint-tooltip>
              {{ namesHints.bid }}
            </hint-tooltip>
            Highest Bid
          </th>
          <td>
            <price-label :price="name.bid"/>
          </td>
        </tr>
        <tr v-if="states.includes('active')">
          <th>
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
        <tr v-if="states.includes('active')">
          <th>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints[name.stateString + 'Height'] }}
            </hint-tooltip>
            {{ name.stateLabel }} Height
          </th>
          <td>
            <app-link
              :to="`/keyblocks/${name.auctionEndsHeight || name.expirationHeight}`">
              {{ name.auctionEndsHeight || name.expirationHeight }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints[name.stateString + 'Time'] }}
            </hint-tooltip>
            {{ name.stateLabel }}
          </th>
          <td>
            <timestamp-label
              :timestamp="name.auctionEnds || name.expiration"
              :is-extended="true"/>
          </td>
        </tr>
        <tr>
          <th>
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
@import url("../assets/styles/utilities/_detail-table.css");

.name-details-panel {
  &__container {
    display: flex;
    gap: var(--space-1);
  }
}
</style>
