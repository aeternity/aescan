<template>
  <app-panel class="oracle-details-panel">
    <header class="oracle-details-panel__header">
      <h3 class="oracle-details-panel__heading">
        DETAILS
      </h3>
      <div class="oracle-details-panel__container">
        <copy-chip
          :label="oracleDetails.id"
          class="oracle-details-panel__chip"/>
        <copy-chip
          :label="formatEllipseHash(oracleDetails.id)"
          :clipboard-text="oracleDetails.id"
          class="oracle-details-panel__chip-ellipse"/>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Registered
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.registeredHeight }} -
            <datetime-label :datetime="oracleDetails.registered"/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Last extended
          </th>
          <td class="oracle-details-panel__data">
            <template v-if="oracleDetails.lastExtended">
              {{ oracleDetails.lastExtendedHeight }} -
              <datetime-label :datetime="oracleDetails.lastExtended"/>
            </template>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Last query
          </th>
          <td class="oracle-details-panel__data">
            <template v-if="oracleDetails.lastQuery">
              {{ oracleDetails.lastQueryHeight }} -
              <datetime-label :datetime="oracleDetails.lastQuery"/>
            </template>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Expiration
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.expirationHeight }} -
            <datetime-label :datetime="oracleDetails.expiration"/>
          </td>
        </tr>
        <tr
          class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Query fee
          </th>
          <td class="oracle-details-panel__data">
            {{ formatAePrice(oracleDetails.fee, null) }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Query format
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.queryFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Query response
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.responseFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Creator
          </th>
          <td class="oracle-details-panel__data">
            <app-link :to="`/accounts/${oracleDetails.creator}`">
              <span class="oracle-details-panel__hash">
                {{ oracleDetails.creator }}
              </span>
              <span class="oracle-details-panel__hash-ellipse">{{
                formatEllipseHash(oracleDetails.creator)
              }}</span>
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { formatAePrice } from '@/utils/format'
import AppLink from '@/components/AppLink'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import DatetimeLabel from '@/components/DatetimeLabel'

defineProps({
  oracleDetails: {
    type: [Object, null],
    default: null,
  },
})
</script>

<style scoped>
.oracle-details-panel {
  padding: var(--space-4) var(--space-1) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
  }

  &__heading {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__header {
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__container {
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-1);
    margin-bottom: var(--space-1);

    @media (--desktop) {
      justify-content: flex-end;
      margin-bottom: 0;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__chip,
  &__hash {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__chip-ellipse,
  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
