<template>
  <app-panel class="account-details-panel">
    <template v-if="accountDetails.isExistent === false">
      <copy-chip :label="accountDetails.id"/>

      <p class="account-details-panel__not-existent">
        The account has never been seen in the network.
        <br>
        Details will be displayed once the account is directly involved in a native transaction, but the account can
        already receive custom tokens.
      </p>
    </template>
    <table v-else>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ accountHints.address }}
            </hint-tooltip>
            Address
          </th>
          <td>
            <copy-chip :label="accountDetails.id"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ accountHints.balance }}
            </hint-tooltip>
            Balance
          </th>
          <td>
            <price-label :price="accountDetails.balance"/>
          </td>
        </tr>

        <tr>
          <th>
            <hint-tooltip>
              {{ accountHints.value }}
            </hint-tooltip>
            Value
          </th>
          <td>
            {{ sanitizedPrice }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ accountHints.transactions }}
            </hint-tooltip>
            Transactions
          </th>
          <td>
            {{ formatNumber(accountDetails.totalTransactionsCount) }}
          </td>
        </tr>
        <tr v-if="accountDetails.isGeneralized">
          <th>
            <hint-tooltip>
              {{ accountHints.generalized }}
            </hint-tooltip>
            Is Generalized
          </th>
          <td>
            <app-chip size="sm">
              Generalized
            </app-chip>
          </td>
        </tr>
        <tr v-if="accountDetails.isGeneralized">
          <th>
            <hint-tooltip>
              {{ accountHints.contractId }}
            </hint-tooltip>
            Contract Id
          </th>
          <td>
            <app-link :to="`/contracts/${accountDetails.contractId}`">
              {{ accountDetails.contractId }}
            </app-link>
          </td>
        </tr>
        <tr v-else>
          <th>
            <hint-tooltip>
              {{ accountHints.nonce }}
            </hint-tooltip>
            Nonce
          </th>
          <td>
            {{ accountDetails.nonce }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ accountHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
            <app-link
              :to="accountNodeUrl"
              class="account-details-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Node
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { accountHints } from '@/utils/hints/accountHints'

const { price } = storeToRefs(useMarketStatsStore())
const { NODE_URL } = useRuntimeConfig().public

const props = defineProps({
  accountDetails: {
    type: Object,
    required: true,
  },
})

const accountNodeUrl = computed(() =>
  `${NODE_URL}/accounts/${props.accountDetails.id}`,
)
const sanitizedPrice = computed(() =>
  price.value
    ? `$${formatNumber(props.accountDetails.balance * price.value, 2, 2)}`
    : 'N/A',
)
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");

.account-details-panel {
  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__not-existent {
    margin: var(--space-3) 0;
  }
}
</style>
