<template>
  <app-panel class="oracle-details-panel">
    <table>
      <tbody>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.oracleId }}
            </hint-tooltip>
            Oracle ID
          </th>
          <td class="oracle-details-panel__data">
            <copy-chip :label="oracleDetails.id"/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.registered }}
            </hint-tooltip>
            Registered
          </th>
          <td class="oracle-details-panel__data">
            <div class="oracle-details-panel__container">
              <app-link
                class="oracle-details-panel__block"
                :to="`/keyblocks/${oracleDetails.registeredHeight}`">
                {{ oracleDetails.registeredHeight }}
              </app-link>
              -
              <timestamp-label
                class="oracle-details-panel__timestamp"
                :timestamp="oracleDetails.registered"
                :is-extended="true"/>
            </div>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.lastExtended }}
            </hint-tooltip>
            Last Extended
          </th>
          <td class="oracle-details-panel__data">
            <div
              v-if="oracleDetails.lastExtended"
              class="oracle-details-panel__container">
              <app-link
                class="oracle-details-panel__block"
                :to="`/keyblocks/${oracleDetails.lastExtendedHeight}`">
                {{ oracleDetails.lastExtendedHeight }}
              </app-link>
              -
              <timestamp-label
                class="oracle-details-panel__timestamp"
                :timestamp="oracleDetails.lastExtended"
                :is-extended="true"/>
            </div>
            <not-available-label v-else/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.lastQueried }}
            </hint-tooltip>
            Last Queried
          </th>
          <td class="oracle-details-panel__data">
            <div
              v-if="oracleDetails.lastQueried"
              class="oracle-details-panel__container">
              <app-link
                class="oracle-details-panel__block"
                :to="`/keyblocks/${oracleDetails.lastQueryHeight}`">
                {{ oracleDetails.lastQueryHeight }}
              </app-link>
              -
              <timestamp-label
                class="oracle-details-panel__timestamp"
                :timestamp="oracleDetails.lastQueried"
                :is-extended="true"/>
            </div>
            <not-available-label v-else/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.expiration }}
            </hint-tooltip>
            Expiration
          </th>
          <td class="oracle-details-panel__data">
            <div
              class="oracle-details-panel__container">
              <app-link
                class="oracle-details-panel__block"
                :to="`/keyblocks/${oracleDetails.expirationHeight}`">
                {{ oracleDetails.expirationHeight }}
              </app-link>
              -
              <timestamp-label
                class="oracle-details-panel__timestamp"
                :timestamp="oracleDetails.expiration"
                :is-extended="true"/>
            </div>
          </td>
        </tr>
        <tr
          class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.queryFee }}
            </hint-tooltip>
            Query Fee
          </th>
          <td class="oracle-details-panel__data">
            <price-label :price="oracleDetails.fee"/>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.queryFormat }}
            </hint-tooltip>
            Query Format
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.queryFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.responseFormat }}
            </hint-tooltip>
            Response Format
          </th>
          <td class="oracle-details-panel__data">
            {{ oracleDetails.responseFormat }}
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.operator }}
            </hint-tooltip>
            Operator
          </th>
          <td class="oracle-details-panel__data">
            <app-link
              :to="`/accounts/${oracleDetails.operator}`">
              <span class="u-hidden-mobile">
                {{ oracleDetails.operator }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(oracleDetails.operator) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="oracle-details-panel__row">
          <th class="oracle-details-panel__table-header">
            <hint-tooltip>
              {{ oraclesHints.apiLinks }}
            </hint-tooltip>
            API links
          </th>
          <td class="oracle-details-panel__data">
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
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  oracleDetails: {
    type: Object,
    required: true,
  },
})

const oracleNodeUrl = computed(() =>
  `${NODE_URL}/oracles/${props.oracleDetails.id}`,
)

const oracleMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/oracles/${props.oracleDetails.id}`,
)
</script>

<style scoped>
.oracle-details-panel {
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
    padding-left: 28px;
    padding-top: var(--space-0);

    @media (--mobile) {
      padding-top: var(--space-1);
      display: table-cell;
    }
  }

  &__container {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__block {
    margin-right: var(--space-0);
  }

  &__timestamp {
    margin-left: var(--space-0);
  }
}
</style>
