<template>
  <span>
    {{ activityType }}
  </span>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { ADD_LIQUIDITY_CONTRACT_CALLS, REMOVE_LIQUIDITY_CONTRACT_CALLS, SWAP_CONTRACT_CALLS } from '@/utils/constants'
import { useAppStore } from '@/stores/app'

const { DEX_CONTRACTS } = useRuntimeConfig().public

const { currency } = storeToRefs(useAppStore())

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
    return currency
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
          REMOVE_LIQUIDITY_CONTRACT_CALLS.includes(tx.value.function) ||
          DEX_CONTRACTS.includes(props.activity.payload.contractId)) {
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
      return currency
    } else if (
      DEX_CONTRACTS.includes(props.activity.payload.contractId)) {
      return 'SH-DEX'
    }
    return 'Smart Contract'

  case 'Aex9TransferEvent':
    return 'AEX-9'
  case 'Aex141TransferEvent':
    return 'AEX-141'
  case 'InternalContractCallEvent':
    if (
      DEX_CONTRACTS.includes(props.activity.payload.contractId)) {
      return 'SH-DEX'
    }
    return 'Smart Contract'
  default:
    return 'N/A'
  }
})
</script>
