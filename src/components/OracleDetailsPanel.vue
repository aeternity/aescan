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
            <hint-tooltip>
              {{ oraclesHints.registered }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <app-link
              :to="`/keyblocks/${oracleDetails.registeredHeight}`">
              {{ oracleDetails.registeredHeight }}
            </app-link>
            -
            <datetime-label :datetime="oracleDetails.registered"/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Last Extended
            <hint-tooltip>
              {{ oraclesHints.lastExtended }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <template v-if="oracleDetails.lastExtended">
              <app-link
                :to="`/keyblocks/${oracleDetails.lastExtendedHeight}`">
                {{ oracleDetails.lastExtendedHeight }}
              </app-link>
              -
              <datetime-label :datetime="oracleDetails.lastExtended"/>
            </template>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Last Queried
            <hint-tooltip>
              {{ oraclesHints.lastQueried }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <template v-if="oracleDetails.lastQueried">
              <app-link
                :to="`/keyblocks/${oracleDetails.lastQueryHeight}`">
                {{ oracleDetails.lastQueryHeight }}
              </app-link>
              -
              <datetime-label :datetime="oracleDetails.lastQueried"/>
            </template>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Expiration
            <hint-tooltip>
              {{ oraclesHints.expiration }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <app-link
              :to="`/keyblocks/${oracleDetails.expirationHeight}`">
              {{ oracleDetails.expirationHeight }}
            </app-link>
            -
            <datetime-label :datetime="oracleDetails.expiration"/>
          </td>
        </tr>
        <tr
          class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Query Fee
            <hint-tooltip>
              {{ oraclesHints.queryFee }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            {{ formatAePrice(oracleDetails.fee, null) }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Query Format
            <hint-tooltip>
              {{ oraclesHints.queryFormat }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.queryFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Response Format
            <hint-tooltip>
              {{ oraclesHints.responseFormat }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.responseFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            Operator
            <hint-tooltip>
              {{ oraclesHints.operator }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <app-link
              :to="`/accounts/${oracleDetails.operator}`">
              <span class="oracle-details-panel__hash">
                {{ oracleDetails.operator }}
              </span>
              <span class="oracle-details-panel__hash-ellipse">
                {{ formatEllipseHash(oracleDetails.operator) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr>
          <th class="contract-details-panel__table-header">
            API links
            <hint-tooltip>
              {{ oraclesHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="oracle-details-panel__data">
            <div class="oracle-details-panel__container">
              <app-link
                :to="oracleNodeUrl"
                class="oracle-details-panel__link">
                <app-icon
                  name="file-cloud"
                  :size="22"/>
                Node
              </app-link>
              <app-link
                :to="oracleMiddlewareUrl"
                class="oracle-details-panel__link">
                <app-icon
                  name="file-cloud"
                  :size="22"/>
                Middleware
              </app-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { formatAePrice } from '@/utils/format'
import { oraclesHints } from '@/utils/hints/oraclesHints'
import HintTooltip from '@/components/HintTooltip'
import AppLink from '@/components/AppLink'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import DatetimeLabel from '@/components/DatetimeLabel'
import AppIcon from '@/components/AppIcon'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  oracleDetails: {
    type: Object,
    required: true,
  },
})

const oracleNodeUrl = computed(() =>
  `${NODE_URL}/v3/oracles/${props.oracleDetails.id}`,
)

const oracleMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/v2/oracles/${props.oracleDetails.id}`,
)
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

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
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
