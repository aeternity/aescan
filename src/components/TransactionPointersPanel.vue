<template>
  <app-panel class="transaction-pointers-panel">
    <template #title>
      NAME POINTERS
    </template>
    <table>
      <tbody>
        <tr>
          <th>
            Account
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
          </th>
          <td>
            <app-link
              v-if="pointers.account_pubkey"
              :to="`/accounts/${pointers.account_pubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.account_pubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.account_pubkey) }}
              </span>
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr>
          <th>
            Channel
            <hint-tooltip>
              {{ namesHints.channelPointer }}
            </hint-tooltip>
          </th>
          <td>
            {{ formatNullable(pointers.channel) }}
          </td>
        </tr>
        <tr>
          <th>
            Smart Contract
            <hint-tooltip>
              {{ namesHints.contractPointer }}
            </hint-tooltip>
          </th>
          <td>
            <app-link
              v-if="pointers.contract_pubkey"
              :to="`/contracts/${pointers.contract_pubkey}`">
              <span class="u-hidden-mobile">
                {{ pointers.contract_pubkey }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(pointers.contract_pubkey) }}
              </span>
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr>
          <th>
            Oracle
            <hint-tooltip>
              {{ namesHints.oraclePointer }}
            </hint-tooltip>
          </th>
          <td>
            {{ formatNullable(pointers.oracle_pubkey) }}
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const props = defineProps({
  transactionData: {
    type: Object,
    required: true,
  },
})
const pointers = computed(() => {
  return props.transactionData.pointers.reduce(
    (accumulator, pointer) => ({
      ...accumulator,
      [pointer.key]: pointer.id,
    }),
    {},
  )
})
</script>

<style scoped>
@import url("../assets/styles/utilities/panel-detail.css");
</style>
