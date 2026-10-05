<template>
  <table class="dashboard-names-table">
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ namesHints.nameId }}
          </hint-tooltip>
        </th>
        <th>
          Claimed By
          <hint-tooltip>
            {{ namesHints.owner }}
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
        <th>
          Block
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in recentlyActivatedNames"
        :key="name.name">
        <td class="dashboard-names-table__data">
          <app-link
            :to="`/names/${name.name}`"
            class="dashboard-names-table__chain-name u-ellipsis">
            {{ name.name }}
          </app-link>
        </td>
        <td class="dashboard-names-table__data">
          <value-hash-ellipsed
            :link-to="`/accounts/${name.address}`"
            :hash="name.address"/>
        </td>
        <td class="dashboard-names-table__data">
          <span class="dashboard-names-table__price-type">
            {{ name.isAuction ? 'Auction' : 'Instant' }}
          </span>
          <price-label :price="name.price"/>
        </td>
        <td class="dashboard-names-table__data">
          <timestamp-label :timestamp="name.activated"/>
        </td>
        <td class="dashboard-names-table__data">
          <block-height-link :height="name.activatedHeight"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-names-table {
  &__chain-name {
    display: inline-block;
    max-width: 160px;
  }

  &__data {
    white-space: nowrap;
  }

  /* Allow "relative (absolute)" timestamps to wrap so the table fits narrower desktop widths */
  :deep(.timestamp-label__label) {
    white-space: normal;
  }

  &__price-type {
    display: block;
    width: fit-content;
    padding: 2px 7px;
    font-size: 10.5px;
    font-weight: 600;
    color: var(--text-faint);
    background: var(--bg-elev2);
    border: 1px solid var(--border);
    border-radius: 5px;
    margin-bottom: 2px;
  }
}
</style>
