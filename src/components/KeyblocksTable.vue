<template>
  <table class="keyblocks-table">
    <thead>
      <tr>
        <th>
          Block
          <!--          todo hints-->
          <!--          todo test-->
          <hint-tooltip>
            {{ keyblocksHints.transactionHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ keyblocksHints.transactionTime }}
          </hint-tooltip>
        </th>
        <th>
          Transactions Count
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <th>
          Microblocks Count
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
        <th>
          Fee Recipient
          <hint-tooltip>
            {{ keyblocksHints.transactionData }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="keyblock in keyblocks.data"
        :key="keyblock.height">
        <td>
          <value-hash-ellipsed
            :hash="keyblock.hash"
            :link-to="`/keyblocks/${keyblock.hash}`"/>
        </td>
        <td>
          <block-time-cell
            :height="keyblock.block"
            :timestamp="keyblock.time"/>
        </td>
        <td>
          {{ keyblock.transactionsCount }}
        </td>
        <td>
          {{ keyblock.microBlocksCount }}
        </td>
        <td>
          <value-hash-ellipsed
            :hash="keyblock.beneficiary"
            :link-to="`/accounts/${keyblock.beneficiary}`"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import HintTooltip from '@/components/HintTooltip'
import { keyblocksHints } from "@/utils/hints/keyblocksHints";

defineProps({
  keyblocks: {
    type: Object,
    required: true,
  },
})
</script>
