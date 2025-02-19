<template>
  <app-panel
    v-if="contractDetails"
    class="contract-details-panel">
    <table>
      <tbody>
        <tr class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.contractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td class="contract-details-panel__data">
            <div class="u-hidden-mobile">
              <copy-chip :label="contractDetails.id"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(contractDetails.id)"
                :clipboard-text="contractDetails.id"/>
            </div>
          </td>
        </tr>

        <tr
          v-if="contractDetails.contractType"
          class="contract-details-panel__row">
          <th class="contract-details-panel__table-header">
            <hint-tooltip>
              {{ contractsHints.type }}
            </hint-tooltip>
            Type
          </th>
          <td class="contract-details-panel__data">
            <app-chip size="sm">
              {{ contractDetails.contractType }}
            </app-chip>
          </td>
        </tr>

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
            <div class="contract-details-panel__container">
              <app-link
                v-if="contractDetails.contractType === 'AEX-9'"
                :to="`/tokens/${contractDetails.id}`"
                class="contract-details-panel__link">
                <token-symbol-icon
                  :contract-id="contractDetails.id"
                  class="contract-details-panel__icon"/>
                {{ contractDetails.tokenDetails.symbol }}
                <not-available-label v-if="!contractDetails.tokenDetails.symbol"/>
              </app-link>
              <app-link
                v-if="contractDetails.contractType === 'AEX-141'"
                :to="`/nfts/${contractDetails.id}`">
                {{ contractDetails.tokenDetails.name }}
              </app-link>
            </div>
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
              {{ contractsHints.contractCreatedHeight }}
            </hint-tooltip>
            Created Height
          </th>
          <td class="contract-details-panel__data">
            <app-link :to="`/keyblocks/${contractDetails.creationHeight}`">
              {{ contractDetails.creationHeight }}
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
            <timestamp-label
              :timestamp="contractDetails.creationDate"
              :is-extended="true"/>
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
            <price-label :price="0"/>
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
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { contractsHints } from '@/utils/hints/contractsHints'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  contractDetails: {
    type: Object,
    required: true,
  },
})

const contractNodeUrl = computed(() =>
  `${NODE_URL}/contracts/${props.contractDetails.id}`,
)
const contractMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/contracts/${props.contractDetails.id}`,
)
</script>

<style scoped>
.contract-details-panel {
  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
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

  &__data {
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
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

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-1);
  }
}
</style>
