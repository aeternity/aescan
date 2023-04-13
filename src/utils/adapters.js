import { DateTime } from 'luxon'
import { formatAettosToAe, formatBlockDiffAsDatetime, formatBlocksRelative, formatDecodeBase64 } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

function isAuction(chainName) {
  const auctionLength = 13
  const suffixLength = 6
  return chainName.length - suffixLength < auctionLength
}

export function adaptKeyblock(keyblock) {
  if (keyblock) {
    keyblock.mined = DateTime.fromMillis(keyblock.time)
  }

  return keyblock
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

export function adaptTransactions(transactions, blockHeight) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      createdHeightDiff: blockHeight - transaction.block_height,
      created: DateTime.fromMillis(transaction.micro_time),
      type: transaction.tx.type,
      data: transaction.tx,
    }
  })
  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
  }
}

export function adaptContracts(contracts, blockHeight) {
  const formattedData = contracts.data.map(contract => {
    return {
      contractId: contract.tx.contract_id,
      created: formatBlockDiffAsDatetime(
        contract.block_height,
        blockHeight,
      ),
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
      isAuction: isAuction(chainName),
      price: isAuction(chainName)
        ? formatAettosToAe(chainName.last_bid.tx.name_fee)
        : formatAettosToAe(chainName.info.claims[chainName.info.claims.length - 1].tx.name_fee),
    }
  })
}

export function adaptStateChannels(stateChannels, blockHeight) {
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

export function adaptAccountNames(names, blockHeight) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.info.expire_height,
      expires: formatBlockDiffAsDatetime(
        name.info.expire_height,
        blockHeight,
      ),
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

export function adaptActiveNames(names, blockHeight) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    buyer: name.info.ownership.original,
    owner: name.info.ownership.current,
    fee: formatAettosToAe(name.info.claims[0].tx.name_fee),
    expiration: formatBlockDiffAsDatetime(
      name.info.expire_height,
      blockHeight,
    ),
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

export function adaptExpiredNames(names, blockHeight) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    expirationHeight: name.info.expire_height,
    expiration: formatBlockDiffAsDatetime(
      name.info.expire_height,
      blockHeight,
    ),
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

export function adaptNameActions(transactions, blockHeight) {
  const formattedData = transactions.data
    .map(transaction => {
      const actionBlockHeight = transaction.payload.block_height || transaction.height

      return {
        createdHeightDiff: blockHeight - actionBlockHeight,
        type: transaction.type,
        hash: transaction.payload.source_tx_hash || transaction.payload.call_tx_hash || transaction.payload.hash,
        created: formatBlockDiffAsDatetime(transaction.height, blockHeight),
      }
    })

  return {
    next: transactions.next,
    data: formattedData,
    prev: transactions.prev,
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
) {
  return {
    id: rawContractInformation?.id,
    createTransactionHash: contractCreationTx?.hash,
    createdBy: contractCreationTx?.tx.caller_id,
    creationDate: DateTime.fromMillis(contractCreationTx?.micro_time),
    bytecode: contractCreationTx?.tx.code,
    contractAccount: rawContractInformation?.id.replace('ct_', 'ak_'),
    accountBalance: rawContractInformation?.deposit,
    callsCount: contractCallsCount,
    contractType,
  }
}

export function adaptContractEvents(events, blockHeight) {
  const formattedData = events.data
    .map(event => {
      return {
        created: formatBlockDiffAsDatetime(event.height, blockHeight),
        createdHeightDiff: formatBlocksRelative(blockHeight - event.height),
        eventName: event.event_name,
        args: event.args,
        data: event.data,
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
        hash: event.contract_tx_hash, // todo this or call_tx_hash,
        name: event.event_name || 'N/A',
        created: formatBlockDiffAsDatetime(event.height, blockHeight),
        args: event.args.toString(),
        data: event.data,
      }
    })

  return {
    next: events.next,
    data: formattedData,
    prev: events.prev,
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
