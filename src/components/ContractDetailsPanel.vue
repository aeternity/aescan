<template>
  <app-panel class="contract-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <div class="u-hidden-mobile">
        <copy-chip :label="contractDetails.id"/>
      </div>
      <div class="u-hidden-desktop">
        <copy-chip
          :label="formatEllipseHash(contractDetails.id)"
          :clipboard-text="contractDetails.id"/>
      </div>
      <app-chip
        v-if="contractDetails?.contractType"
        size="sm">
        {{ contractDetails.contractType }}
      </app-chip>
    </template>
    <table>
      <tbody>
        <tr
          v-if="contractDetails.contractType"
          class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Token
            <hint-tooltip>
              {{ contractsHints.token }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <div
              v-if="contractDetails.contractType === 'AEX-9'"
              class="contract-details-panel__token-container">
              <app-link
                :to="`/tokens/${contractDetails.id}`"
                class="contract-details-panel__token">
                <token-symbol-icon
                  :contract-id="contractDetails.id"
                  class="contract-details-panel__icon"/>
                {{ contractDetails.tokenDetails.symbol }}
              </app-link>
            </div>
            <app-link
              v-if="contractDetails.contractType === 'AEX-141'"
              :to="`/nfts/${contractDetails.id}`">
              {{ contractDetails.tokenDetails.name }}
            </app-link>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Create Transaction
            <hint-tooltip>
              {{ contractsHints.contractTxHash }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/transactions/${contractDetails.createTransactionHash}`">
              <span class="u-hidden-mobile">
                {{ contractDetails.createTransactionHash }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(contractDetails.createTransactionHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Created Height
            <hint-tooltip>
              {{ contractsHints.contractCreatedHeight }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/keyblocks/${contractDetails.creationHeight}`">
              {{ contractDetails.creationHeight }}
            </app-link>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            Created
            <hint-tooltip>
              {{ contractsHints.contractCreated }}
            </hint-tooltip>
          </th>
          <td class="contract-details-panel__data">
            <timestamp-label
              :timestamp="contractDetails.creationDate"
              :is-extended="true"/>
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
              <span class="u-hidden-mobile">
                {{ contractDetails.createdBy }}
              </span>
              <span class="u-hidden-desktop">
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
              <span class="u-hidden-mobile">
                {{ contractDetails.contractAccount }}
              </span>
              <span class="u-hidden-desktop">
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
            API Links
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
import { contractsHints } from '@/utils/hints/contractsHints'
import HintTooltip from '@/components/HintTooltip'
import TokenSymbolIcon from '@/components/TokenSymbolIcon'

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
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
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

  &__token-container {
    height: 24px;
    display: flex;
    justify-content: flex-end;
  }

  &__token {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }

  &__container {
    height: 24px;
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
}
</style>
