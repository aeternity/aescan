<template>
  <div>
    <table
      v-for="node in nodeOperators"
      :key="node.networkId"
      class="node-operators-table-condensed__table">
      <tbody>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Node Id
              <template #tooltip>
                {{ tokensHints.tokenSymbol }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            <value-hash-ellipsed
              :hash="node.genesisHash"
              :link-to="`/keyblocks/${node.genesisHash}`"/>
          </td>
        </tr>

        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Host
              <template #tooltip>
                {{ tokensHints.tokenName }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.host }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Port
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.port }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Network Id
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.networkId }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Node Version
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.nodeVersion }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Node Revision
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.nodeRevision }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              Node Vendor
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.nodeVendor }}
          </td>
        </tr>
        <tr class="node-operators-table-condensed__row">
          <th class="node-operators-table-condensed__header">
            <app-tooltip>
              OS
              <template #tooltip>
                {{ tokensHints.smartContractId }}
              </template>
            </app-tooltip>
          </th>
          <td class="node-operators-table-condensed__data">
            {{ node.nodeOs }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { tokensHints } from '~/utils/hints/tokensHints'

defineProps({
  nodeOperators: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.node-operators-table-condensed {
  &__table {
    padding: 0 var(--space-1) var(--space-7);
    margin-bottom: var(--space-5);
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
