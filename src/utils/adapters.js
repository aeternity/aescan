import { DateTime } from 'luxon'

import { BigNumber } from 'bignumber.js'
import { decode, Encoding, isAddressValid } from '@aeternity/aepp-sdk'

import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

export function adaptMicroblock(microblock) {
  return {
    ...microblock,
    time: DateTime.fromMillis(microblock.time).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
  }
}

export function adaptSelectedMicroblockTransactions(transactions) {
  const formattedData = transactions.data.map(transaction => {
    return {
      hash: transaction.hash,
      type: transaction.tx.type,
      data: transaction.tx,
      created: DateTime.fromMillis(transaction.microTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      created: DateTime.fromMillis(transaction.microTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      created: DateTime.fromMillis(contract.microTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      address: name.ownership.current,
      activatedHeight: name.activeFrom,
      activated: formatBlockDiffAsDatetime(
        name.activeFrom,
        blockHeight,
      ),
      isAuction: formatIsAuction(name.name),
      price: formatAettosToAe(name.nameFee),
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
      updated: DateTime.fromMillis(channel.lastUpdatedTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      time: DateTime.fromMillis(activity.payload?.microTime || activity.blockTime)
        .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      expirationHeight: name.expireHeight,
      expiration: DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
      pointers: name.pointers.map(pointer => pointer.id),
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
  }
}

export function adaptActiveNames(names) {
  const formattedData = names.data.map(name => ({
    name: name.name,
    buyer: name.ownership.original,
    owner: name.ownership.current,
    fee: formatAettosToAe(name.nameFee),
    expiration: DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    expirationHeight: name.expireHeight,
    pointers: Object.values(name.pointers),
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
    highestBidder: name.lastBid.tx.accountId,
    bid: formatAettosToAe(name.lastBid.tx.nameFee),
    bidCount: name.claimsCount,
    expirationHeight: name.auctionEnd,
    expiration: DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
    expirationHeight: name.expireHeight,
    expiration: DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    fee: formatAettosToAe(name.nameFee),
    lastBuyer: name.ownership.original,
    lastOwner: name.ownership.current,
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}

export function adaptCustomPointers(allPointers) {
  const customPointers = allPointers.filter(pointer =>
    // separate special and custom pointers
    !SPECIAL_POINTERS_PRESET_KEYS.includes(pointer.key),
  )

  const hasRawPointers = allPointers
    ? allPointers.some(pointer => isAddressValid(pointer.id, Encoding.Bytearray))
    : null

  return customPointers.map(pointer => {
    return {
      key: pointer.key,
      pointer: hasRawPointers ? decode(pointer.id).toString() : pointer.id,
      isRawPointer: hasRawPointers,
    }
  })
}

export function adaptName(name, blockHeight, blockTime) {
  const lastBid = name?.auction?.lastBid
  const states = formatNameState(name, blockHeight)
  const endHeight = name.auction?.auctionEnd
  const ends = name.auction?.approximateExpireTime || name.approximateExpireTime
  const blockCreatedTime = DateTime.fromMillis(blockTime)
  const activated = states.includes('active')
    ? blockCreatedTime.minus({
      minutes: blockHeight - name.activeFrom * MINUTES_PER_BLOCK,
    }).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    : null
  const customPointers = adaptCustomPointers(name.pointers)

  const specialPointers = {
    account: name.pointers ? name.pointers.find(name => name.key === 'account_pubkey')?.id : null,
    channel: name.pointers ? name.pointers.find(name => name.key === 'channel')?.id : null,
    contract: name.pointers ? name.pointers.find(name => name.key === 'contract_pubkey')?.id : null,
    oracle: name.pointers ? name.pointers.find(name => name.key === 'oracle_pubkey')?.id : null,
  }

  return {
    states,
    name: name.name,
    active: name.active,
    owner: name?.ownership?.current,
    bidder: lastBid?.tx?.accountId,
    bid: lastBid?.tx.nameFee ? formatAettosToAe(lastBid.tx.nameFee) : null,
    activatedHeight: states.includes('active') ? name.activeFrom : null,
    activated,
    expirationHeight: name.expireHeight,
    expiration: name.approximateExpireTime
      ? DateTime.fromMillis(name.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
      : null,
    auctionEndsHeight: endHeight,
    auctionEnds: ends
      ? DateTime.fromMillis(ends).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
      : null,
    specialPointers,
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
      created: DateTime.fromMillis(action.blockTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }
  })

  return {
    next: actions.next,
    data: formattedData,
    prev: actions.prev,
  }
}

export function adaptTransactionDetails(transactionDetails, blockHeight) {
  const created = transactionDetails.time
    ? DateTime.fromMillis(transactionDetails.time).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    : null
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
    creationDate: DateTime.fromMillis(contractCreationTx?.microTime)
      .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
        created: DateTime.fromMillis(event.blockTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
        created: DateTime.fromMillis(event.blockTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
    lastUpdated: DateTime.fromMillis(stateChannel.lastUpdatedTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
        updated: DateTime.fromMillis(channel.lastUpdatedTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
        time: DateTime.fromMillis(transfer.microTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
        creationTime: DateTime.fromMillis(nft.creationTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
    verifiedAt: DateTime.fromISO(verificationDetail.verifiedAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
      timestamp: DateTime.fromMillis(trade.microTime).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
      rate: formatTradeRate(trade.action, fromAmount, toAmount),
      value: price ? formatTradeValue(trade.action, fromAmount, toAmount, price) : null,
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
