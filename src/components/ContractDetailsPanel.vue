<template>
  <app-panel class="contract-details-panel">
    <header class="contract-details-panel__header">
      <h2 class="contract-details-panel__heading h3">
        DETAILS
      </h2>
      <div class="contract-details-panel__container">
        <div class="contract-details-panel__hash">
          <copy-chip :label="contractDetails.id"/>
        </div>
        <div class="contract-details-panel__hash-ellipse">
          <copy-chip
            :label="formatEllipseHash(contractDetails.id)"
            :clipboard-text="contractDetails.id"/>
        </div>
        <app-chip v-if="contractDetails?.contractType">
          {{ contractDetails.contractType }}
        </app-chip>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Create Transaction
            <hint-tooltip>
              {{ contractsHints.contractTxHash }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/transactions/${contractDetails.createTransactionHash}`">
              <span class="contract-details-panel__hash">
                {{ contractDetails.createTransactionHash }}
              </span>
              <span class="contract-details-panel__hash-ellipse">
                {{ formatEllipseHash(contractDetails.createTransactionHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Date
            <hint-tooltip>
              {{ contractsHints.contractCreated }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <datetime-label :datetime="contractDetails.creationDate"/>
          </td>
        </tr>
        <tr
          v-if="contractDetails.createdBy"
          class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Created By
            <hint-tooltip>
              {{ contractsHints.contractCreator }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/accounts/${contractDetails.createdBy}`">
              <span class="contract-details-panel__hash">
                {{ contractDetails.createdBy }}
              </span>
              <span class="contract-details-panel__hash-ellipse">
                {{ formatEllipseHash(contractDetails.createdBy) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr
          v-if="contractDetails.bytecode"
          class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Bytecode
            <hint-tooltip>
              {{ contractsHints.bytecode }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <copy-chip
              :label="formatEllipseHash(contractDetails.bytecode)"
              :clipboard-text="contractDetails.bytecode"/>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Smart Contract’s Account
            <hint-tooltip>
              {{ contractsHints.contractsAccount }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/accounts/${contractDetails.contractAccount}`">
              <span class="contract-details-panel__hash">
                {{ contractDetails.contractAccount }}
              </span>
              <span class="contract-details-panel__hash-ellipse">
                {{ formatEllipseHash(contractDetails.contractAccount) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Smart Contract's Account Balance
            <hint-tooltip>
              {{ contractsHints.contractsAccountBalance }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            {{ formatAePrice(formatAettosToAe(contractDetails.contractAccountBalance), null) }}
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Smart Contract Calls
            <hint-tooltip>
              {{ contractsHints.contractCalls }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            {{ contractDetails.callsCount }}
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            API links
            <hint-tooltip>
              {{ contractsHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <div class="contract-details-panel__container">
              <app-link
                :to="contractNodeUrl"
                class="contract-details-panel__link">
                <app-icon
                  name="file-cloud"
                  :size="22"/>
                Node
              </app-link>
              <app-link
                :to="contractMiddlewareUrl"
                class="contract-details-panel__link">
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
import AppPanel from '@/components/AppPanel'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import CopyChip from '@/components/CopyChip'
import AppChip from '@/components/AppChip'
import { formatAePrice, formatAettosToAe, formatEllipseHash } from '@/utils/format'
import DatetimeLabel from '@/components/DatetimeLabel'
import { contractsHints } from '@/utils/hints/contractsHints'
import HintTooltip from '~/components/HintTooltip'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  contractDetails: {
    type: Object,
    required: true,
  },
})

const contractNodeUrl = computed(() =>
  `${NODE_URL}/v3/contracts/${props.contractDetails.id}`,
)
const contractMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/v2/contracts/${props.contractDetails.id}`,
)
</script>

<style scoped>
.contract-details-panel {
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
    @media (--desktop) {
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

  &__hash {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
