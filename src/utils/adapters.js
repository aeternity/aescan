import { DateTime } from 'luxon'
import { useRuntimeConfig } from 'nuxt/app'
import { BigNumber } from 'bignumber.js'
import { decode, Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import {
  formatAettosToAe,
  formatBlockDiffAsDatetime,
  formatDecodeBase64,
  formatIsAuction,
  formatIsStatefulEntrypoint,
  formatNameState,
  formatNumber,
  formatPercentage,
  formatTemplateLimit,
  formatTokenLimit,
  formatTradeRate,
} from '@/utils/format'

import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

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

export function adaptContracts(contracts) {
  const formattedData = contracts.data.map(contract => {
    return {
      contractId: contract.tx.contractId,
      created: DateTime.fromMillis(contract.microTime),
      createdHeight: contract.blockHeight,
      hash: contract.hash,
      createdBy: contract.tx.callerId,
      isVerified: contract.isVerified,
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
      isAuction: formatIsAuction(name.name),
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
      updatedHeight: channel.lastUpdatedHeight,
      updated: DateTime.fromMillis(channel.lastUpdatedTime),
      lastTxType: channel.lastUpdatedTxType,
    }
  })
}

export function adaptAccountActivities(activities) {
  const formattedData = activities.data.map(activity => {
    return {
      hash: activity.payload?.hash || activity.payload?.txHash ||
        activity.payload?.refTxHash || activity.payload?.callTxHash,
      type: activity.type,
      time: DateTime.fromMillis(activity.payload?.microTime || activity.blockTime),
      height: activity.payload?.blockHeight || activity.height,
      payload: activity.payload,
      hintKey:
        activity.payload?.tx
          ? activity.payload.tx.type.charAt(0).toLowerCase() + activity.payload.tx.type.slice(1)
          : null,
    }
  })

  return {
    next: activities.next,
    data: formattedData,
    prev: activities.prev,
  }
}

export function adaptAccountNames(names) {
  const formattedData = names.data.map(name => {
    return {
      name: name.name,
      expirationHeight: name.info.expireHeight,
      expiration: DateTime.fromMillis(name.info.approximateExpireTime),
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
        ? `$${formatNumber(
          (new BigNumber(amount)).multipliedBy(tokenAePrice).multipliedBy(aeFiatPrice).toNumber(),
          null, null, 7)}`
        : 'N/A',
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

export function adaptInAuctionNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    highestBidder: name.info.lastBid.tx.accountId,
    bid: formatAettosToAe(name.info.lastBid.tx.nameFee),
    bidCount: name.info.bids.length,
    expirationHeight: name.info.auctionEnd,
    expiration: DateTime.fromMillis(name.info.approximateExpireTime),
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
  const hasRawPointers = allPointers
    ? Object.values(allPointers)
      .some(v => isAddressValid(v, Encoding.Bytearray))
    : null

  return Object.entries(customPointers).map(pointer => {
    return {
      key: formatDecodeBase64(pointer[0]),
      pointer: hasRawPointers ? decode(pointer[1]).toString() : pointer[1],
      isRawPointer: hasRawPointers,
    }
  })
}

export function adaptName(name, blockHeight, blockTime) {
  const lastBid = name?.auction?.lastBid || name?.info?.lastBid
  const customPointers = adaptCustomPointers(name.info?.pointers)
  const endHeight = name.auction?.auctionEnd || name?.info?.auctionEnd
  const ends = name.auction?.approximateAuctionEndTime || name.info?.approximateAuctionEndTime
  const state = formatNameState(name, blockHeight)
  const blockCreatedTime = DateTime.fromMillis(blockTime)
  const activated = state === 'active'
    ? blockCreatedTime.minus({
      minutes: blockHeight - name.info.activeFrom * MINUTES_PER_BLOCK,
    })
    : null

  return {
    state,
    name: name.name,
    active: name.active,
    owner: name.info?.ownership?.current,
    bidder: lastBid?.tx?.accountId,
    bid: lastBid?.tx.nameFee ? formatAettosToAe(lastBid.tx.nameFee) : null,
    activatedHeight: state === 'active' ? name.info.activeFrom : null,
    activated,
    expirationHeight: name.info.expireHeight,
    expiration: name.info.approximateExpireTime
      ? DateTime.fromMillis(name.info.approximateExpireTime)
      : null,
    auctionEndsHeight: endHeight,
    auctionEnds: ends
      ? DateTime.fromMillis(ends)
      : null,
    specialPointers: {
      account: name.info?.pointers?.account_pubkey,
      channel: name.info?.pointers?.channel,
      contract: name.info?.pointers?.contract_pubkey,
      oracle: name.info?.pointers?.oracle_pubkey,
    },
    customPointers,
  }
}

export function adaptNameActions(actions) {
  const formattedData = actions.data.map(action => {
    return {
      type: action.type,
      hash: action.payload.sourceTxHash || action.payload.callTxHash || action.payload.hash,
      createdHeight: action.height,
      payload: action.payload,
      created: DateTime.fromMillis(action.blockTime),
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
  tokenDetails,
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
    tokenDetails,
  }
}

export function adaptContractEvents(events) {
  const formattedData = events.data
    .map(event => {
      return {
        created: DateTime.fromMillis(event.blockTime),
        createdHeight: event.height,
        eventName: event.eventName,
        data: event.args,
        args: event.args,
        isDecoded: !!event.eventName,
        callTxHash: event.callTxHash,
        logIdx: event.logIdx,
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

  if (token && totalSupply !== null) {
    tokenDetails.totalSupply = (new BigNumber(totalSupply)).dividedBy(10 ** token.decimals).toNumber()
  }

  return tokenDetails
}

export function adaptTokenEvents(events) {
  const formattedData = events.data
    .map(event => {
      return {
        hash: event.callTxHash,
        name: event.eventName || 'N/A',
        created: DateTime.fromMillis(event.blockTime),
        createdHeight: event.height,
        isDecoded: !!event.eventName,
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
  const formattedData = tokenHolders.data
    .map(holder => {
      const percentage = (new BigNumber(holder.amount)
        .dividedBy(10 ** (tokenDetails.decimals - 2)))
        .dividedBy(tokenDetails.totalSupply).toNumber()
      return {
        address: holder.accountId,
        contractId: holder.contractId,
        amount: (new BigNumber(holder.amount)).dividedBy(10 ** tokenDetails.decimals).toNumber(),
        percentage: formatPercentage(percentage),
      }
    })

  return {
    next: tokenHolders.next,
    data: formattedData,
    prev: tokenHolders.prev,
  }
}

export function adaptListedTokens(tokens) {
  const formattedData = tokens
    .map(token => {
      return {
        contractId: token.address,
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

export function adaptOracles(oracles) {
  const formattedData = oracles.data.map(oracle => {
    return {
      id: oracle.oracle,
      registeredHeight: oracle.activeFrom,
      registered: DateTime.fromMillis(oracle.registerTime),
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

export function adaptOracleDetails(oracle, lastExtendedTx, lastQueryTx) {
  const oracleDetails = {
    id: oracle.oracle,
    fee: formatAettosToAe(oracle.queryFee),
    expiration: DateTime.fromMillis(oracle.approximateExpireTime),
    expirationHeight: oracle.expireHeight,
    registered: DateTime.fromMillis(oracle.registerTime),
    registeredHeight: oracle.activeFrom,
    queryFormat: oracle.format.query,
    responseFormat: oracle.format.response,
    operator: oracle.oracle.replace('ok_', 'ak_'),
    lastExtended: lastExtendedTx ? DateTime.fromMillis(lastExtendedTx.microTime) : null,
    lastExtendedHeight: lastExtendedTx?.blockHeight,
    lastQueried: lastQueryTx ? DateTime.fromMillis(lastQueryTx.blockTime) : null,
    lastQueryHeight: lastQueryTx?.height,
  }
  return oracleDetails
}

export function adaptOracleEvents(events) {
  const formattedData = events.data.map(event => {
    return {
      queriedAt: DateTime.fromMillis(event.query.blockTime),
      queriedHeight: event.query.height,
      respondedAt: DateTime.fromMillis(event.blockTime),
      respondedHeight: event.height,
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
        locked: formatAettosToAe(channel.amount),
        updatedHeight: channel.lastUpdatedHeight,
        updated: DateTime.fromMillis(channel.lastUpdatedTime),
        lastTxType: channel.lastUpdatedTxType,
      }
    })
  return {
    next: stateChannels.next,
    data: formattedData,
    prev: stateChannels.prev,
  }
}

export function adaptNftTransfers(transfers) {
  const formattedData = transfers.data
    .map(transfer => {
      return {
        txHash: transfer.txHash,
        time: DateTime.fromMillis(transfer.microTime),
        height: transfer.blockHeight,
        tokenId: transfer.tokenId,
        recipient: transfer.recipient,
        sender: transfer.sender,
      }
    })
  return {
    next: transfers.next,
    data: formattedData,
    prev: transfers.prev,
  }
}

export function adaptNft(nft) {
  return {
    ...nft,
    tokenLimit: formatTokenLimit(nft.extensions, nft.limits?.tokenLimit),
    templateLimit: formatTemplateLimit(nft.extensions, nft.limits?.templateLimit),
  }
}

export function adaptNfts(nfts) {
  const formattedData = nfts.data
    .map(nft => {
      return {
        name: nft.name,
        blockHeight: nft.blockHeight,
        creationTime: DateTime.fromMillis(nft.creationTime),
        contractId: nft.contractId,
        nftsAmount: nft.nftsAmount,
        nftOwners: nft.nftOwners,
      }
    })
  return {
    next: nfts.next,
    data: formattedData,
    prev: nfts.prev,
  }
}

export function adaptVerificationDetail(verificationDetail) {
  return {
    license: verificationDetail.license,
    compiler: verificationDetail.compiler,
    entryFile: verificationDetail.entryFile,
    initCallParameters: verificationDetail.initCallParameters,
    aci: verificationDetail.aci,
    verifiedAt: DateTime.fromISO(verificationDetail.verifiedAt),
  }
}

export function adaptVerificationResult(verificationStatus) {
  function translateCodeToStatus(code) {
    if (code === 400 || code === 422) {
      return 'fail'
    }
    if (code === 409) {
      return 'conflict'
    }
    return null
  }

  return {
    ...verificationStatus,
    status: translateCodeToStatus(verificationStatus.statusCode),
  }
}

export function adaptMarketStatsGate(stats) {
  return {
    price: stats[0].last,
    volume: stats[0].baseVolume,
  }
}

export function adaptMarketStatsMexc(stats) {
  return {
    price: stats.lastPrice,
    volume: stats.volume,
  }
}

export function adaptMarketStatsCoinStore(stats) {
  const tokenPair = stats.data.find(item => item.symbol === 'AEUSDT')
  return {
    price: tokenPair.close,
    volume: tokenPair.volume,
  }
}

export function adaptMarketStatsHotCoin(stats) {
  const tokenPair = stats.ticker.find(item => item.symbol === 'ae_usdt')
  return {
    price: tokenPair.last,
    volume: tokenPair.vol,
  }
}

export function adaptMarketStatsCoinW(stats) {
  return {
    price: stats.data.aeUsdt.last,
    volume: stats.data.aeUsdt.baseVolume,
  }
}

export function adaptTopAccounts(topAccounts, distribution) {
  return topAccounts
    .slice(0, 100)
    .map((account, index) => {
      return {
        rank: index + 1,
        account: account.account,
        balance: formatAettosToAe(account.balance),
        percentage: (formatAettosToAe(account.balance) * 100 / distribution).toFixed(4),
      }
    })
}

export function adaptKeyblocks(keyblocks) {
  const formattedData = keyblocks.data
    .map(keyblock => {
      return {
        hash: keyblock.hash,
        block: keyblock.height,
        time: DateTime.fromMillis(keyblock.time),
        miner: keyblock.miner,
        microBlocksCount: keyblock.microBlocksCount,
        transactionsCount: keyblock.transactionsCount,
        beneficiary: keyblock.beneficiary,
        beneficiaryReward: formatAettosToAe(keyblock.beneficiaryReward),
      }
    })
  return {
    next: keyblocks.next,
    data: formattedData,
    prev: keyblocks.prev,
  }
}

export function adaptTrades(trades, price) {
  const formattedData = trades.data.map(trade => {
    const fromAmount = trade.fromAmount / 10 ** trade.fromDecimals
    const toAmount = trade.toAmount / 10 ** trade.toDecimals
    return {
      fromAmount,
      toAmount,
      txHash: trade.txHash,
      fromToken: trade.fromToken,
      toToken: trade.toToken,
      fromContract: trade.fromContract,
      toContract: trade.toContract,
      action: trade.action,
      height: trade.height,
      timestamp: DateTime.fromMillis(trade.microTime),
      rate: formatTradeRate(trade.action, fromAmount, toAmount),
      value: formatTradeValue(trade.action, fromAmount, toAmount, price),
    }
  })
  return {
    next: trades.next,
    data: formattedData,
    prev: trades.prev,
  }
}

export function adaptAciObject(verificationDetails) {
  const aci = JSON.parse(verificationDetails.aci).find(item => item.contract)
  const filteredFunctions = aci?.contract?.functions?.filter(fn => fn.name !== 'init')
  aci.contract.functions = filteredFunctions
  return aci
}

export function adaptReadEntrypoints(aci) {
  return Object.groupBy(aci.contract.functions, formatIsStatefulEntrypoint).false
}

export function adaptWriteEntrypoints(aci) {
  return Object.groupBy(aci.contract.functions, formatIsStatefulEntrypoint).true

}
