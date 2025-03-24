<template>
  <app-panel
    v-if="contractDetails"
    class="contract-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td>
            <copy-chip :label="contractDetails.id"/>
          </td>
        </tr>

        <tr v-if="contractDetails.contractType">
          <th>
            <hint-tooltip>
              {{ contractsHints.type }}
            </hint-tooltip>
            Type
          </th>
          <td>
            <app-chip size="sm">
              {{ contractDetails.contractType }}
            </app-chip>
          </td>
        </tr>
        <tr v-if="contractDetails.contractType">
          <th>
            <hint-tooltip>
              {{ contractsHints.token }}
            </hint-tooltip>
            Token
          </th>
          <td>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractTxHash }}
            </hint-tooltip>
            Create Transaction
          </th>
          <td>
            <app-link :to="`/transactions/${contractDetails.createTransactionHash}`">
              {{ contractDetails.createTransactionHash }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractCreatedHeight }}
            </hint-tooltip>
            Created Height
          </th>
          <td>
            <app-link :to="`/keyblocks/${contractDetails.creationHeight}`">
              {{ contractDetails.creationHeight }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractCreated }}
            </hint-tooltip>
            Created
          </th>
          <td>
            <timestamp-label
              :timestamp="contractDetails.creationDate"
              :is-extended="true"/>
          </td>
        </tr>
        <tr v-if="contractDetails.createdBy">
          <th>
            <hint-tooltip>
              {{ contractsHints.contractCreator }}
            </hint-tooltip>
            Created By
          </th>
          <td>
            <app-link :to="`/accounts/${contractDetails.createdBy}`">
              {{ contractDetails.createdBy }}
            </app-link>
          </td>
        </tr>
        <tr v-if="contractDetails.bytecode">
          <th>
            <hint-tooltip>
              {{ contractsHints.bytecode }}
            </hint-tooltip>
            Bytecode
          </th>
          <td>
            <copy-chip
              :label="formatEllipseHash(contractDetails.bytecode)"
              :clipboard-text="contractDetails.bytecode"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractsAccount }}
            </hint-tooltip>
            Smart Contract’s Account
          </th>
          <td>
            <app-link :to="`/accounts/${contractDetails.contractAccount}`">
              {{ contractDetails.contractAccount }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractsAccountBalance }}
            </hint-tooltip>
            Smart Contract's Account Balance
          </th>
          <td>
            <price-label :price="0"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.contractCalls }}
            </hint-tooltip>
            Smart Contract Calls
          </th>
          <td>
            {{ contractDetails.callsCount }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ contractsHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
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
@import url("../assets/styles/utilities/panel-detail.css");

.contract-details-panel {
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
