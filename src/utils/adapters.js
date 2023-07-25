import { DateTime } from 'luxon'
import { formatAettosToAe, formatBlockDiffAsDatetime, formatDecodeBase64 } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

function isAuction(chainName) {
  const auctionLength = 13
  const suffixLength = 6
  return chainName.length - suffixLength < auctionLength
}

export function adaptKeyblock(keyblock, keyblockDeltaStats = null) {
  if (keyblock) {
    return {
      ...keyblock,
      mined: DateTime.fromMillis(keyblock.time),
      block_reward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.block_reward) : null,
      dev_reward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.dev_reward) : null,
    }
  }

  return keyblock
}

export function adaptKeyblockMicroblocks(keyblockMicroblocks) {
  const formattedData = keyblockMicroblocks.data.map(microblock => {
    return {
      time: DateTime.fromMillis(microblock.time),
      transactionsCount: microblock.transactions_count,
      hash: microblock.hash,
    }
  })
  return {
    next: keyblockMicroblocks.next,
    data: formattedData,
    prev: keyblockMicroblocks.prev,
  }
}

export function adaptMicroblock(microblock) {
  return {
    ...microblock,
    time: DateTime.fromMillis(microblock.time),
  }
}

export function adaptSelectedMicroblockTransactions(transactions) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      type: transaction.tx.type,
      data: transaction.tx,
      created: DateTime.fromMillis(transaction.micro_time),
    }
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
  }
}

export function adaptTransactions(transactions) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      createdHeight: transaction.block_height,
      created: DateTime.fromMillis(transaction.micro_time),
      type: transaction.tx.type,
      data: transaction.tx,
      hintKey: transaction.tx.type.charAt(0).toLowerCase() + transaction.tx.type.slice(1),
    }
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
  }
}

export function adaptContracts(contracts) {
  const formattedData = contracts.data.map(contract => {
    return {
      contractId: contract.tx.contract_id,
      created: DateTime.fromMillis(contract.micro_time),
      createdHeight: contract.block_height,
      hash: contract.hash,
      createdBy: contract.tx.caller_id,
    }
  })
  return {
    next: contracts.next,
    data: formattedData,
    prev: contracts.prev,
  }
}

export function adaptChainNames(chainNames, blockHeight) {
  return chainNames.map(chainName => {
    return {
      name: chainName.name,
      address: chainName.info.ownership.current,
      activatedHeight: chainName.info.active_from,
      activated: formatBlockDiffAsDatetime(
        chainName.info.active_from,
        blockHeight,
      ),
      isAuction: isAuction(chainName.name),
      price: formatAettosToAe(chainName.info.claims.at(-1).tx.name_fee),
    }
  })
}

export function adaptDashboardStateChannels(stateChannels, blockHeight) {
  return stateChannels.map(channel => {
    return {
      initiator: channel.initiator,
      responder: channel.responder,
      channel: channel.channel,
      updateCount: channel.updates_count,
      amount: formatAettosToAe(channel.amount),
      updatedHeight: channel.last_updated_height,
      updated: formatBlockDiffAsDatetime(
        channel.last_updated_height,
        blockHeight,
      ),
      updateType: channel.last_updated_tx_type,
    }
  })
}

export function adaptAccountNames(names) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.info.expire_height,
      expires: DateTime.fromMillis(name.info.approximate_expire_time),
      pointers: Object.values(name.info.pointers),
    }
  })
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptDeltaStats(deltaStats, keyblockHeight) {
  const selectedDeltaStats = deltaStats.find(
    stat => stat.height === keyblockHeight,
  )

  if (!selectedDeltaStats) {
    return null
  }

  return {
    ...selectedDeltaStats,
    block_reward: formatAettosToAe(selectedDeltaStats.block_reward),
    dev_reward: formatAettosToAe(selectedDeltaStats.dev_reward),
  }
}

export function adaptActiveNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    buyer: name.info.ownership.original,
    owner: name.info.ownership.current,
    fee: formatAettosToAe(name.info.claims[0].tx.name_fee),
    expiration: DateTime.fromMillis(name.info.approximate_expire_time),
    expirationHeight: name.info.expire_height,
    pointers: Object.values(name.info.pointers),
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptInAuctionNames(names, blockHeight) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    highestBidder: name.info.last_bid.tx.account_id,
    bid: formatAettosToAe(name.info.last_bid.tx.name_fee),
    bidCount: name.info.bids.length,
    expirationHeight: name.info.auction_end,
    expiration: formatBlockDiffAsDatetime(name.info.auction_end, blockHeight),
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptExpiredNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    expirationHeight: name.info.expire_height,
    expiration: DateTime.fromMillis(name.info.approximate_expire_time),
    fee: formatAettosToAe(name.info.claims[0].tx.name_fee),
    lastBuyer: name.info.ownership.original,
    lastOwner: name.info.ownership.current,
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptCustomPointers(allPointers) {
  const customPointers = { ...allPointers }

  SPECIAL_POINTERS_PRESET_KEYS.forEach(specialPointerKey => {
    // separate special and custom pointers
    delete customPointers[specialPointerKey]
  })

  return Object.entries(customPointers).map(pointer => {
    return {
      key: formatDecodeBase64(pointer[0]),
      pointer: pointer[1],
    }
  })
}

export function adaptName(name, blockHeight, blockTime) {
  const lastBid = name?.auction?.last_bid || name?.info?.last_bid
  const customPointers = adaptCustomPointers(name.info?.pointers)
  const formattedName = {
    name: name.name,
    active: name.active,
    owner: name.info?.ownership?.current,
    bidder: lastBid?.tx?.account_id,
    bid: lastBid?.tx.name_fee ? formatAettosToAe(lastBid.tx.name_fee) : null,
    status: name.status,
    expirationHeight: name.info.expire_height ?? name.info.auction_end,
    expiration: formatBlockDiffAsDatetime(
      name.info.expire_height ?? name.info.auction_end,
      blockHeight,
    ),
    specialPointers: {
      account: name.info?.pointers?.account_pubkey,
      channel: name.info?.pointers?.channel,
      contract: name.info?.pointers?.contract_pubkey,
      oracle: name.info?.pointers?.oracle_pubkey,
    },
    customPointers,
  }

  if (name.status === 'name' && name.active) {
    const blockCreatedTime = DateTime.fromMillis(blockTime)
    const heightDiff = blockHeight - name.info.active_from
    formattedName.activated = blockCreatedTime.minus({
      minutes: heightDiff * MINUTES_PER_BLOCK,
    })
  }

  return formattedName
}

export function adaptNameActions(actions, blockHeight) {
  const formattedData = actions.data.map(action => {
    return {
      type: action.type,
      hash: action.payload.source_tx_hash || action.payload.call_tx_hash || action.payload.hash,
      createdHeight: action.payload.block_height || action.height,
      created: action.payload?.micro_time
        ? DateTime.fromMillis(action.payload.micro_time)
        : formatBlockDiffAsDatetime(
          action.payload.block_height || action.height,
          blockHeight,
        ),
    }
  })

  return {
    next: actions.next,
    data: formattedData,
    prev: actions.prev,
  }
}

export function adaptTransactionDetails(transactionDetails, blockHeight) {
  const created = transactionDetails.time ? DateTime.fromMillis(transactionDetails.time) : null
  const confirmations = transactionDetails.isMined ? blockHeight.value - transactionDetails.block_height : 0
  const blockHash = transactionDetails.block_hash !== 'none' ? transactionDetails.block_hash : null

  return {
    type: transactionDetails.tx.type,
    blockHeight: transactionDetails.block_height,
    blockHash,
    hash: transactionDetails.hash,
    fee: transactionDetails.tx.fee,
    nonce: transactionDetails.tx.nonce,
    isMined: transactionDetails.isMined,
    confirmations,
    created,
  }
}

export function adaptContractDetails(
  rawContractInformation,
  contractCallsCount,
  contractCreationTx,
  contractType,
  contractAccountBalance,
) {
  return {
    id: rawContractInformation?.id,
    createTransactionHash: contractCreationTx?.hash,
    createdBy: contractCreationTx?.tx.caller_id,
    creationDate: DateTime.fromMillis(contractCreationTx?.micro_time),
    bytecode: contractCreationTx?.tx.code,
    contractAccount: rawContractInformation?.id.replace('ct_', 'ak_'),
    contractAccountBalance,
    callsCount: contractCallsCount,
    contractType,
  }
}

export function adaptContractEvents(events, blockHeight) {
  const formattedData = events.data
    .map(event => {
      return {
        created: formatBlockDiffAsDatetime(event.height, blockHeight),
        createdHeight: event.height,
        eventName: event.event_name,
        data: event.args,
        callTxHash: event.call_tx_hash,
      }
    })

  return {
    next: events.next,
    data: formattedData,
    prev: events.prev,
  }
}

export function adaptTokenDetails(token, totalSupply = null, price = null) {
  const tokenDetails = {
    ...token,
    ...(price && { price }),
  }

  if (token && totalSupply) {
    tokenDetails.totalSupply = Number(totalSupply / BigInt(10 ** token.decimals))
  }

  if (tokenDetails.totalSupply && price) {
    tokenDetails.marketCap = tokenDetails.totalSupply * price
  }

  return tokenDetails
}

export function adaptTokenEvents(events, blockHeight) {
  const formattedData = events.data
    .map(event => {
      return {
        hash: event.call_tx_hash,
        name: event.event_name || 'N/A',
        created: formatBlockDiffAsDatetime(event.height, blockHeight),
        createdHeight: event.height,
        args: event.args,
      }
    })

  return {
    next: events.next,
    data: formattedData,
    prev: events.prev,
  }
}

export function adaptTokenHolders(tokenHolders, tokenDetails) {
  const formattedData = tokenHolders.data.map(holder => ({
    address: holder.account_id,
    amount: holder.amount / (10 ** tokenDetails.decimals),
    percentage: (holder.amount / (10 ** (tokenDetails.decimals - 2))) / tokenDetails.totalSupply,
  }))

  return {
    next: tokenHolders.next,
    data: formattedData,
    prev: tokenHolders.prev,
  }
}

export function adaptListedTokens(tokens) {
  const formattedData = tokens
    .filter(token => token.listed === true)
    .map(token => {
      return {
        contract_id: token.address,
        name: token.name,
        symbol: token.symbol,
        isAe: token.address === useRuntimeConfig().public.AE_TOKEN_CONTRACT_ID,
      }
    })

  return {
    next: null,
    data: formattedData,
    prev: null,
  }
}

export function adaptOracles(oracles, blockHeight) {
  const formattedData = oracles.data.map(oracle => {
    return {
      id: oracle.oracle,
      activeFromHeight: oracle.active_from,
      activeFrom: formatBlockDiffAsDatetime(oracle.active_from, blockHeight),
      expireHeight: oracle.expire_height,
      expire: DateTime.fromMillis(oracle.approximate_expire_time),
      queryFee: formatAettosToAe(oracle.query_fee),
    }
  })

  return {
    next: oracles.next,
    data: formattedData,
    prev: oracles.prev,
  }
}

export function adaptOracleDetails(oracle, lastExtendedTx, lastQueryTx, blockHeight) {
  const oracleDetails = {
    id: oracle.oracle,
    fee: formatAettosToAe(oracle.query_fee),
    expiration: DateTime.fromMillis(oracle.approximate_expire_time),
    expirationHeight: oracle.expire_height,
    registered: oracle.active_from
      ? formatBlockDiffAsDatetime(
        oracle.active_from,
        blockHeight,
      )
      : null,
    registeredHeight: oracle.active_from,
    queryFormat: oracle.format.query,
    responseFormat: oracle.format.response,
    operator: oracle.oracle.replace('ok_', 'ak_'),
    lastExtended: lastExtendedTx ? DateTime.fromMillis(lastExtendedTx.micro_time) : null,
    lastExtendedHeight: lastExtendedTx?.block_height,
    lastQueried: lastQueryTx ? DateTime.fromMillis(lastQueryTx.micro_time) : null,
    lastQueryHeight: lastQueryTx?.block_height,
  }

  return oracleDetails
}

export function adaptOracleEvents(events) {
  const formattedData = events.data.map(event => {
    return {
      queryTx: event.query.source_tx_hash,
      respondTx: event.source_tx_hash,
      queryId: event.query.query_id,
      queryFee: formatAettosToAe(event.query.fee),
      query: formatDecodeBase64(event.query.query),
      responseTtl: event.query.response_ttl.value,
      response: formatDecodeBase64(event.response),
    }
  })

  return {
    next: events?.next,
    data: formattedData,
    prev: events?.prev,
  }
}

export function adaptStateChannelDetails(stateChannel, stateChannelCreateTx, blockHeight) {
  return {
    id: stateChannel.channel,
    isOpen: stateChannel.active,
    createTransactionHash: stateChannelCreateTx.source_tx_hash,
    initialAmount: formatAettosToAe(stateChannel.initiator_amount + stateChannel.responder_amount),
    initiator: stateChannel.initiator,
    responder: stateChannel.responder,
    onChainUpdates: stateChannel.updates_count,
    lastKnownRound: stateChannel.round,
    aeLocked: formatAettosToAe(stateChannel.amount),
    lastUpdatedHeight: stateChannel.last_updated_height,
    lastUpdated: stateChannel.last_updated_height
      ? formatBlockDiffAsDatetime(
        stateChannel.last_updated_height,
        blockHeight,
      )
      : null,
    lastTxType: stateChannel.last_updated_tx_type,
  }
}

export function adaptStateChannels(channels, blockHeight) {
  const formattedData = channels.data
    .map(channel => {
      return {
        id: channel.channel,
        status: channel.active ? 'Open' : 'Closed',
        initiator: channel.initiator,
        responder: channel.responder,
        updateCount: channel.updates_count,
        locked: formatAePrice(formatAettosToAe(channel.amount)),
        updated: formatBlockDiffAsDatetime(channel.last_updated_height, blockHeight),
        updatedHeight: channel.last_updated_height,
        updateType: channel.last_updated_tx_type,
      }
    })
  return {
    next: channels.next,
    data: formattedData,
    prev: channels.prev,
  }
}
