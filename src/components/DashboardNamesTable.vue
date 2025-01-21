<template>
  <table>
    <thead>
      <tr>
        <th>
          Data
          <hint-tooltip>
            {{ namesHints.recentlyActivatedData }}
          </hint-tooltip>
        </th>
        <th>
          Price
          <hint-tooltip>
            {{ namesHints.activationPrice }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button>Activated</time-toggle-button>
          <hint-tooltip>
            {{ namesHints.activationTime }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in recentlyActivatedNames"
        :key="name.name">
        <td>
          <div>
            <span class="dashboard-names-table__label">Name:</span>
            <app-link
              :to="`/names/${name.name}`"
              class="dashboard-names-table__chain-name u-ellipsis">
              {{ name.name }}
            </app-link>
          </div>
          <div>
            <span class="dashboard-names-table__label">Claimed by: </span>
            <value-hash-ellipsed
              :link-to="`/accounts/${name.address}`"
              :hash="name.address"/>
          </div>
        </td>
        <td>
          <div class="dashboard-names-table__label">
            {{ name.isAuction ? 'Auction' : 'Fixed price' }}
          </div>
          <div>
            <price-label :price="name.price"/>
          </div>
        </td>
        <td>
          <div class="dashboard-names-table__blocks">
            <block-time-cell
              :height="name.activatedHeight"
              :timestamp="name.activated"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { namesHints } from '@/utils/hints/namesHints'
import { useNamesStore } from '@/stores/names'

const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-names-table {
  &__chain-name {
    display: inline-block;
    width: 160px;
  }

  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }

  &__blocks {
    margin-bottom: var(--space-0);
  }
}
</style>
