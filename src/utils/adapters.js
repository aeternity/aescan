import { DateTime } from 'luxon'
import { useRuntimeConfig } from 'nuxt/app'
import { BigNumber } from 'bignumber.js'
import { formatAettosToAe, formatBlockDiffAsDatetime, formatDecodeBase64, formatNameStatus } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

function isAuction(name) {
  const auctionLength = 13
  const suffixLength = 6
  return name.length - suffixLength < auctionLength
}

export function adaptKeyblock(keyblock, keyblockDeltaStats = null) {
  if (keyblock) {
    return {
      ...keyblock,
      mined: DateTime.fromMillis(keyblock.time),
      blockReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.blockReward) : null,
      devReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.devReward) : null,
    }
  }

  return keyblock
}

export function adaptKeyblockMicroblocks(keyblockMicroblocks) {
  const formattedData = keyblockMicroblocks.data.map(microblock => {
    return {
      time: DateTime.fromMillis(microblock.time),
      transactionsCount: microblock.transactionsCount,
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
      created: DateTime.fromMillis(transaction.microTime),
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
      createdHeight: transaction.blockHeight,
      created: DateTime.fromMillis(transaction.microTime),
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
      contractId: contract.tx.contractId,
      created: DateTime.fromMillis(contract.microTime),
      createdHeight: contract.blockHeight,
      hash: contract.hash,
      createdBy: contract.tx.callerId,
    }
  })
  return {
    next: contracts.next,
    data: formattedData,
    prev: contracts.prev,
  }
}

export function adaptNames(names, blockHeight) {
  return names.map(name => {
    return {
      name: name.name,
      address: name.info.ownership.current,
      activatedHeight: name.info.activeFrom,
      activated: formatBlockDiffAsDatetime(
        name.info.activeFrom,
        blockHeight,
      ),
      isAuction: isAuction(name.name),
      price: formatAettosToAe(name.info.claims.at(-1)?.tx.nameFee),
    }
  })
}

export function adaptDashboardStateChannels(stateChannels) {
  return stateChannels.map(channel => {
    return {
      initiator: channel.initiator,
      responder: channel.responder,
      channel: channel.channel,
      updateCount: channel.updatesCount,
      amount: formatAettosToAe(channel.amount),
      lastUpdatedHeight: channel.lastUpdatedHeight,
      lastUpdated: DateTime.fromMillis(channel.lastUpdatedTime),
      lastTxType: channel.lastUpdatedTxType,
    }
  })
}

export function adaptAccountNames(names) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.info.expireHeight,
      expires: DateTime.fromMillis(name.info.approximateExpireTime),
      pointers: Object.values(name.info.pointers),
    }
  })
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptAccountTokens(tokens, tokenPrices, aeFiatPrice) {
  const formattedData = tokens.data.map(token => {
    const amount = token.amount / (10 ** token.decimals)
    const tokenAePrice = tokenPrices[token.contractId] || null

    return {
      tokenSymbol: token.tokenSymbol,
      tokenName: token.tokenName,
      contractId: token.contractId,
      amount,
      value: tokenAePrice !== null
        ? (new BigNumber(amount)).multipliedBy(tokenAePrice).multipliedBy(aeFiatPrice).toNumber()
        : null,
    }
  })
  return {
    next: tokens.next,
    data: formattedData,
    prev: tokens.prev,
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
    blockReward: formatAettosToAe(selectedDeltaStats.blockReward),
    devReward: formatAettosToAe(selectedDeltaStats.devReward),
  }
}

export function adaptActiveNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    buyer: name.info.ownership.original,
    owner: name.info.ownership.current,
    fee: formatAettosToAe(name.info.claims[0].tx.nameFee),
    expiration: DateTime.fromMillis(name.info.approximateExpireTime),
    expirationHeight: name.info.expireHeight,
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
    highestBidder: name.info.lastBid.tx.accountId,
    bid: formatAettosToAe(name.info.lastBid.tx.nameFee),
    bidCount: name.info.bids.length,
    expirationHeight: name.info.auctionEnd,
    expiration: formatBlockDiffAsDatetime(name.info.auctionEnd, blockHeight),
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
    expirationHeight: name.info.expireHeight,
    expiration: DateTime.fromMillis(name.info.approximateExpireTime),
    fee: formatAettosToAe(name.info.claims[0].tx.nameFee),
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
  const lastBid = name?.auction?.lastBid || name?.info?.lastBid
  const customPointers = adaptCustomPointers(name.info?.pointers)
  const formattedName = {
    name: name.name,
    active: name.active,
    owner: name.info?.ownership?.current,
    bidder: lastBid?.tx?.accountId,
    bid: lastBid?.tx.nameFee ? formatAettosToAe(lastBid.tx.nameFee) : null,
    status: name.status,
    expirationHeight: name.info.expireHeight ?? name.info.auctionEnd,
    expiration: formatBlockDiffAsDatetime(
      name.info.expireHeight ?? name.info.auctionEnd,
      blockHeight,
    ),
    specialPointers: {
      account: name.info?.pointers?.accountPubkey,
      channel: name.info?.pointers?.channel,
      contract: name.info?.pointers?.contractPubkey,
      oracle: name.info?.pointers?.oraclePubkey,
    },
    customPointers,
  }

  if (name.status === 'name' && name.active) {
    const blockCreatedTime = DateTime.fromMillis(blockTime)
    const heightDiff = blockHeight - name.info.activeFrom
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
      hash: action.payload.sourceTxHash || action.payload.callTxHash || action.payload.hash,
      createdHeight: action.payload.blockHeight || action.height,
      created: action.payload?.microTime
        ? DateTime.fromMillis(action.payload.microTime)
        : formatBlockDiffAsDatetime(
          action.payload.blockHeight || action.height,
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
  const confirmations = transactionDetails.isMined ? blockHeight.value - transactionDetails.blockHeight : 0
  const blockHash = transactionDetails.blockHash !== 'none' ? transactionDetails.blockHash : null

  return {
    type: transactionDetails.tx.type,
    blockHeight: transactionDetails.blockHeight,
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
    createdBy: contractCreationTx?.tx.callerId,
    creationDate: DateTime.fromMillis(contractCreationTx?.microTime),
    creationHeight: contractCreationTx.blockHeight,
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
        eventName: event.eventName,
        data: event.args,
        callTxHash: event.callTxHash,
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
    tokenDetails.totalSupply = (new BigNumber(totalSupply)).dividedBy(10 ** token.decimals).toNumber()
  }

  if (tokenDetails.totalSupply && price) {
    tokenDetails.marketCap = (new BigNumber(tokenDetails.totalSupply)).multipliedBy(price).toNumber()
  }

  return tokenDetails
}

export function adaptTokenEvents(events, blockHeight) {
  const formattedData = events.data
    .map(event => {
      return {
        hash: event.callTxHash,
        name: event.eventName || 'N/A',
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
    address: holder.accountId,
    amount: (new BigNumber(holder.amount)).dividedBy(10 ** tokenDetails.decimals).toNumber(),
    percentage: (new BigNumber(holder.amount)
      .dividedBy(10 ** (tokenDetails.decimals - 2)))
      .dividedBy(tokenDetails.totalSupply).toNumber(),
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
        contractId: token.address,
        name: token.name,
        symbol: token.symbol,
        isAe: token.address === useRuntimeConfig().public.AE_TOKEN_CONTRACT_ID,
      }
    })

  const isMainnet = useRuntimeConfig().public.NETWORK_NAME.toLowerCase() === 'mainnet'

  if (isMainnet && !formattedData.some(token => token.contractId === LAEX_CONTRACT_ID)) {
    formattedData.unshift({
      contractId: LAEX_CONTRACT_ID,
      name: 'LÆXON',
      symbol: 'LAEX',
      isAe: false,
    })
  }

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
      activeFromHeight: oracle.activeFrom,
      activeFrom: formatBlockDiffAsDatetime(oracle.activeFrom, blockHeight),
      expirationHeight: oracle.expireHeight,
      expiration: DateTime.fromMillis(oracle.approximateExpireTime),
      queryFee: formatAettosToAe(oracle.queryFee),
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
    fee: formatAettosToAe(oracle.queryFee),
    expiration: DateTime.fromMillis(oracle.approximateExpireTime),
    expirationHeight: oracle.expireHeight,
    registered: oracle.activeFrom
      ? formatBlockDiffAsDatetime(
        oracle.activeFrom,
        blockHeight,
      )
      : null,
    registeredHeight: oracle.activeFrom,
    queryFormat: oracle.format.query,
    responseFormat: oracle.format.response,
    operator: oracle.oracle.replace('ok_', 'ak_'),
    lastExtended: lastExtendedTx ? DateTime.fromMillis(lastExtendedTx.microTime) : null,
    lastExtendedHeight: lastExtendedTx?.blockHeight,
    lastQueried: lastQueryTx ? DateTime.fromMillis(lastQueryTx.microTime) : null,
    lastQueryHeight: lastQueryTx?.blockHeight,
  }
  return oracleDetails
}

export function adaptOracleEvents(events) {
  const formattedData = events.data.map(event => {
    return {
      queryTx: event.query.sourceTxHash,
      respondTx: event.sourceTxHash,
      queryId: event.query.queryId,
      queryFee: formatAettosToAe(event.query.fee),
      query: formatDecodeBase64(event.query.query),
      responseTtl: event.query.responseTtl.value,
      response: formatDecodeBase64(event.response),
    }
  })

  return {
    next: events?.next,
    data: formattedData,
    prev: events?.prev,
  }
}

export function adaptStateChannelDetails(stateChannel, stateChannelCreateTx) {
  return {
    id: stateChannel.channel,
    isOpen: stateChannel.active,
    createTransactionHash: stateChannelCreateTx.sourceTxHash,
    initialAmount: formatAettosToAe(stateChannel.initiatorAmount + stateChannel.responderAmount),
    initiator: stateChannel.initiator,
    responder: stateChannel.responder,
    onChainUpdates: stateChannel.updatesCount,
    lastKnownRound: stateChannel.round,
    aeLocked: formatAettosToAe(stateChannel.amount),
    lastUpdatedHeight: stateChannel.lastUpdatedHeight,
    lastUpdated: DateTime.fromMillis(stateChannel.lastUpdatedTime),
    lastTxType: stateChannel.lastUpdatedTxType,
  }
}

export function adaptStateChannels(stateChannels) {
  const formattedData = stateChannels.data
    .map(channel => {
      return {
        id: channel.channel,
        status: channel.active ? 'Open' : 'Closed',
        initiator: channel.initiator,
        responder: channel.responder,
        updateCount: channel.updatesCount,
        locked: formatAePrice(formatAettosToAe(channel.amount)),
        lastUpdated: DateTime.fromMillis(channel.lastUpdatedTime),
        lastUpdatedHeight: channel.lastUpdatedHeight,
        lastTxType: channel.lastUpdatedTxType,
      }
    })
  return {
    next: channels.next,
    data: formattedData,
    prev: channels.prev,
  }
}

export function adaptNamesResults(names) {
  const formattedData = names.data
    .map(name => {
      return {
        name: name.payload.name,
        status: formatNameStatus(name),
      }
    })

  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
