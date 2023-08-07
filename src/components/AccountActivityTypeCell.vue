<template>
  <span>
    {{ activityType }}
  </span>
</template>

<script setup>
import { SWAP_CONTRACT_CALLS, ADD_LIQUIDITY_CONTRACT_CALLS, REMOVE_LIQUIDITY_CONTRACT_CALLS } from '@/utils/constants'

const props = defineProps({
  accountDetails: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
})

const tx = computed(() => props.activity.payload?.tx)

const activityType = computed(() => {
  switch (props.activity.type) {
  case 'SpendTxEvent':
    return 'AE'
  case 'NamePreclaimTxEvent':
  case 'NameClaimTxEvent':
  case 'NameTransferTxEvent':
  case 'NameRevokeTxEvent':
  case 'NameUpdateTxEvent':
    return 'AENS'
  case 'ContractCreateTxEvent':
    return 'Smart Contract'
  case 'ContractCallTxEvent':
    if (
      SWAP_CONTRACT_CALLS.includes(tx.value.function) ||
      ADD_LIQUIDITY_CONTRACT_CALLS.includes(tx.value.function) ||
      REMOVE_LIQUIDITY_CONTRACT_CALLS.includes(tx.value.function)) {
      return 'SH-DEX'
    }
    return 'Smart Contract'
  case 'OracleRegisterTxEvent':
  case 'OracleQueryTxEvent':
  case 'OracleRespondTxEvent':
  case 'OracleExtendTxEvent':
    return 'Oracle'
  case 'ChannelCreateTxEvent':
  case 'ChannelDepositTxEvent':
  case 'ChannelWithdrawTxEvent':
  case 'ChannelCloseMutualTxEvent':
  case 'ChannelCloseSoloTxEvent':
  case 'ChannelSlashTxEvent':
  case 'ChannelSettleTxEvent':
  case 'ChannelSnapshotSoloTxEvent':
  case 'ChannelForceProgressTxEvent':
    return 'State Channel'
  case 'GAAttachTxEvent':
  case 'GAMetaTxEvent':
    return 'GA Transaction'
  case 'PayingForTxEvent':
    return 'Wrapped Transaction'
  case 'InternalTransferEvent':
    if (props.activity.payload.kind === 'reward_block') {
      return 'AE'
    }
    return 'N/A'
  default:
    return 'N/A'
  }
})
</script>
