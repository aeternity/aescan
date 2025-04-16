<template>
  <span>
    {{ activityDescription }}
  </span>
</template>

<script setup>
import { ADD_LIQUIDITY_CONTRACT_CALLS, REMOVE_LIQUIDITY_CONTRACT_CALLS, SWAP_CONTRACT_CALLS } from '@/utils/constants'

const { SH_DEX_CONTRACTS } = useRuntimeConfig().public

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

const activityDescription = computed(() => {
  switch (props.activity.type) {
  case 'SpendTxEvent':
    if (tx.value.senderId === props.accountDetails.id) {
      return 'Transferred to'
    }
    return 'Received from'
  case 'NamePreclaimTxEvent':
    return 'Preclaimed'
  case 'NameClaimTxEvent':
    return 'Claimed'
  case 'NameTransferTxEvent':
    if (tx.value.accountId === props.accountDetails.id) {
      return 'Transferred to'
    }
    return 'Received from'
  case 'NameRevokeTxEvent':
    return 'Revoked'
  case 'NameUpdateTxEvent':
    return 'Updated'
  case 'ContractCreateTxEvent':
    return 'Created'
  case 'ContractCallTxEvent':
    if (SWAP_CONTRACT_CALLS.includes(tx.value.function)) {
      return 'Swapped'
    } else if (ADD_LIQUIDITY_CONTRACT_CALLS.includes(tx.value.function)) {
      return 'Added liquidity'
    } else if (REMOVE_LIQUIDITY_CONTRACT_CALLS.includes(tx.value.function)) {
      return 'Removed liquidity'
    }
    return 'Called'
  case 'OracleRegisterTxEvent':
    return 'Registered'
  case 'OracleQueryTxEvent':
    return 'Queried'
  case 'OracleRespondTxEvent':
    return 'Responded'
  case 'OracleExtendTxEvent':
    return 'Extended'
  case 'ChannelCreateTxEvent':
    return 'Created'
  case 'ChannelDepositTxEvent':
    return 'Deposited'
  case 'ChannelWithdrawTxEvent':
    return 'Withdrew'
  case 'ChannelCloseMutualTxEvent':
    return 'Closed mutually'
  case 'ChannelCloseSoloTxEvent':
    return 'Closed solo'
  case 'ChannelSlashTxEvent':
    return 'Issued slash'
  case 'ChannelSettleTxEvent':
    return 'Settled'
  case 'ChannelSnapshotSoloTxEvent':
    return 'Snapshotted'
  case 'ChannelForceProgressTxEvent':
    return 'Force progressed'
  case 'GAAttachTxEvent':
    return 'Attached contract'
  case 'GAMetaTxEvent':
    return 'Transferred'
  case 'PayingForTxEvent':
    return 'Paid for'
  case 'InternalTransferEvent':
    if (props.activity.payload.kind === 'reward_block') {
      return 'Reward'
    }
    if (SH_DEX_CONTRACTS.includes(props.activity.payload.contractId)) {
      return 'SH-DEX transfer'
    }
    return 'Internal transfer'
  case 'Aex9TransferEvent':
    return 'Transferred to'
  case 'Aex141TransferEvent':
    return 'Transferred to'
  case 'InternalContractCallEvent':
    return 'Internal call'
  default:
    return 'N/A'
  }
})
</script>
