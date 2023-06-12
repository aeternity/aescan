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
          Activated
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
            <span class="names-table__label">Name:</span>
            <app-link
              :to="`/names/${name.name}`"
              class="names-table__chain-name u-ellipsis">
              {{ name.name }}
            </app-link>
          </div>
          <div>
            <span class="names-table__label">Claimed by: </span>
            <value-hash-ellipsed
              :link-to="`/accounts/${name.address}`"
              :hash="name.address"/>
          </div>
        </td>
        <td>
          <div class="names-table__label">
            {{ name.isAuction ? 'Auction bid' : 'Fixed price' }}
          </div>
          <div class="names-table__name-price">
            {{ formatAePrice(name.price) }}
          </div>
        </td>
        <td>
          <div class="names-table__blocks">
            {{ name.activatedHeight }}
          </div>
          <div>
            <datetime-label :datetime="name.activated"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import AppLink from '@/components/AppLink'
import { namesHints } from '@/utils/hints/namesHints'
import { useNamesStore } from '@/stores/names'
import { formatAePrice } from '@/utils/format'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.names-table {
  &__chain-name {
    display: inline-block;
    width: 160px;
  }

  &__label {
    display: inline-block;
    margin: 0 var(--space-0) var(--space-0) 0;
  }

  &__name-price {
    font-weight: 700;
  }

  &__blocks {
    margin-bottom: var(--space-0);
  }
}
</style>
