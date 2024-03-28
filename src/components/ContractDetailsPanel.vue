<template>
  <app-panel class="contract-details-panel">
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
            <hint-tooltip>
              {{ contractsHints.token }}
            </hint-tooltip>
            Token
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
            <hint-tooltip>
              {{ contractsHints.contractTxHash }}
            </hint-tooltip>
            Create Transaction
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
            <hint-tooltip>
              {{ contractsHints.contractCreated }}
            </hint-tooltip>
            Created
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/keyblocks/${contractDetails.creationHeight}`">
              {{ contractDetails.creationHeight }}
            </app-link>
            (
            <datetime-label :datetime="contractDetails.creationDate"/>
            )
          </td>
        </tr>
        <tr
          v-if="contractDetails.createdBy"
          class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.contractCreator }}
            </hint-tooltip>
            Created By
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
            <hint-tooltip>
              {{ contractsHints.bytecode }}
            </hint-tooltip>
            Bytecode
          </th>
          <td class="contract-details-panel__data">
            <copy-chip
              :label="formatEllipseHash(contractDetails.bytecode)"
              :clipboard-text="contractDetails.bytecode"/>
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.contractsAccount }}
            </hint-tooltip>
            Smart Contract’s Account
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
            <hint-tooltip>
              {{ contractsHints.contractsAccountBalance }}
            </hint-tooltip>
            Smart Contract's Account Balance
          </th>
          <td class="contract-details-panel__data">
            {{ formatAePrice(formatAettosToAe(contractDetails.contractAccountBalance), null) }}
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.contractCalls }}
            </hint-tooltip>
            Smart Contract Calls
          </th>
          <td class="contract-details-panel__data">
            {{ contractDetails.callsCount }}
          </td>
        </tr>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.apiLinks }}
            </hint-tooltip>
            API Links
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
    @media (--desktop) {
      width: 400px;
    }
    border-bottom: 1px solid var(--color-midnight-25);
    font-weight: normal;
  }

  &__data {
    text-align: left;
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
