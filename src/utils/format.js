import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import {
  KNOWN_ADDRESSES,
  MAXIMUM_FRACTION_DIGITS,
  MINUTES_PER_BLOCK,
  NUMBER_FRACTION_THRESHOLD,
  REVOKED_PERIOD,
} from '@/utils/constants'
import numeral from 'numeral'

export function formatEllipseHash(hash) {
  const prefix = hash.slice(0, 10)
  const suffix = hash.slice(hash.length - 2)
  return `${prefix}...${suffix}`
}

// todo check previous parameters
// export function formatNumber(
//   number,
//   minimumFractionDigits = 0,
//   maximumFractionDigits = 5,
//   maximumSignificantDigits = null) {
//   if (isNaN(number) || number === null) {
//     return number
//   }
//
//   if (maximumSignificantDigits !== null) {
//     return Intl.NumberFormat('en-US', {
//       maximumSignificantDigits,
//     }).format(number)
//   }
//
//   return Intl.NumberFormat('en-US', {
//     minimumFractionDigits: number >= NUMBER_FRACTION_THRESHOLD ? 0 : minimumFractionDigits,
//     maximumFractionDigits: number >= NUMBER_FRACTION_THRESHOLD ? 0 : maximumFractionDigits,
//   }).format(number)
// }

// export function formatAePrice(price, maxDigits = 8) {
//   if (isNaN(price) || price === null) {
//     return price
//   }
//
//   if (maxDigits === null) {
//     return `${formatNumber(price, 0, MAXIMUM_FRACTION_DIGITS)}`
//   }
//
//   const truncatedPrice = new BigNumber(price).toFixed(
//     maxDigits,
//     BigNumber.ROUND_DOWN,
//   )
//
//   const priceParts = truncatedPrice.split('.')
//   const integers = priceParts[0]
//   let decimals = priceParts[1]
//
//   decimals = decimals?.replace(/0+$/, '')
//
//   if (!decimals) {
//     if (price === 0) {
//       return '0'
//     }
//     if (integers === '0') {
//       return `~${integers}`
//     } else {
//       return `${formatNumber(integers)}`
//     }
//   }
//
//   return `${formatNumber(truncatedPrice, decimals.length, maxDigits)}`
// }

export function formatReduceDecimals(tokenAmount, numberOfDecimals) {
  if (isNaN(tokenAmount) || tokenAmount === null) {
    return tokenAmount
  }

  return (new BigNumber(tokenAmount)).dividedBy(10 ** numberOfDecimals).toNumber()
}

export function formatAettosToAe(aettosAmount) {
  if (isNaN(aettosAmount) || aettosAmount === null) {
    return aettosAmount
  }

  return toAe(aettosAmount)
}

export function formatPercentage(percentage) {
  if (percentage >= 0.00001) {
    return `${formatNumber(percentage)} %`
  }
  if (percentage === 0) {
    return '0 %'
  }
  if (percentage < 0.00001) {
    return '~0 %'
  }
}

export function formatNumber(amount) {
  const shorten = numeral(amount).format('0.[0]a')
  const aaa = parseFloat(amount) < 0.001 ? amount : shorten
  return shorten.includes('NaN') ? amount : aaa
}

// todo raw
export function formatAePrice(amount, maxDigits = 8, isRaw = false) {
  const zeros = '0'.repeat(maxDigits)

  if (amount === '0') {
    return '0'
  }
  if (parseFloat(amount) < 0.1) {
    // return amount
    return numeral(amount).format(`0.0[${zeros}]`)
  }

  const formatted = isRaw ? numeral(amount).format('0,0') : numeral(amount).format(`0,0.[${zeros}]a`)
  return formatted === 'NaN' ? amount : formatted
}

export function formatBlockDiffAsDatetime(expirationHeight, currentBlockHeight) {
  const now = DateTime.now()

  const heightDiff = expirationHeight - currentBlockHeight
  return now.plus({ minutes: heightDiff * MINUTES_PER_BLOCK }).toMillis()
}

export function formatNullable(value) {
  if (value === 0) {
    return value
  }
  if (!value) {
    return 'N/A'
  }
  return value || 'N/A'
}

export function formatDecodeBase64(base64String) {
  try {
    return import.meta.client
      ? (decodeURIComponent(escape(atob(base64String))) ? decodeURIComponent(escape(atob(base64String))) : null)
      : Buffer.from(base64String, 'base64').toString('utf8')
  } catch (error) {
    console.error(error)
    return ''
  }
}

export function formatDecodeByteArray(bytesArray) {
  return String.fromCharCode(...bytesArray)
}

export function formatNameState(name, blockHeight) {
  const isActive = name.active === true
  const isInAuction = !!name.auctionEnd
  const isExpired = name.active === false
  const isRevoked = !name.active
    && name.expireHeight + REVOKED_PERIOD > blockHeight

  const labels = Object.keys({
    active: isActive,
    revoked: isRevoked,
    expired: isExpired,
    auction: isInAuction,
  }).filter(key => ({ active: isActive, revoked: isRevoked, expired: isExpired, auction: isInAuction })[key])
  return labels
}

export function formatIsAuction(name) {
  const auctionLength = 13
  const suffixLength = 6
  return name.length - suffixLength < auctionLength
}

export function formatTokenLimit(extensions, tokenLimit) {
  if (extensions.includes('mintable') && extensions.includes('mintable_limit')) {
    return tokenLimit
  } else if (extensions.includes('mintable') && !extensions.includes('mintable_limit')) {
    return 'Unlimited'
  } else if (extensions.includes('mintable_templates') && extensions.includes('mintable_templates_limit')) {
    return null
  } else if (extensions.includes('mintable_templates') && !extensions.includes('mintable_templates_limit')) {
    return null
  }
}

export function formatTemplateLimit(extensions, templateLimit) {
  if (extensions.includes('mintable') && extensions.includes('mintable_limit')) {
    return null
  } else if (extensions.includes('mintable') || !extensions.includes('mintable_limit')) {
    return null
  } else if (extensions.includes('mintable_templates') && extensions.includes('mintable_templates_limit')) {
    return templateLimit
  } else if (extensions.includes('mintable_templates') || !extensions.includes('mintable_templates_limit')) {
    return 'Unlimited'
  }
}

export function formatKnownAddress(hash, isEllipsed = true) {
  if (KNOWN_ADDRESSES.some(address => address.hash === hash)) {
    return KNOWN_ADDRESSES.find(address => address.hash === hash).name
  } else if (isEllipsed) {
    return formatEllipseHash(hash)
  } else {
    return hash
  }
}

export function formatTradeRate(action, fromAmount, toAmount) {
  if (action === 'BUY') {
    return `${formatNumber((fromAmount / toAmount), 4)} WAE`
  }

  if (action === 'SELL') {
    return `${formatNumber((toAmount / fromAmount), 4)} WAE`
  }
  return null
}

export function formatTradeValue(action, fromAmount, toAmount, price) {
  if (action === 'BUY') {
    return formatNumber(fromAmount * price)
  }

  if (action === 'SELL') {
    return formatNumber(toAmount * price)
  }

  return null
}

export function formatIsStatefulEntrypoint(aciFunction) {
  return !!aciFunction.stateful
}

export function formatEntrypointResponse(value, type) {
  if (type === 'int') {
    return new BigNumber(value)
  }
  if (type === 'address') {
    return value
  }
  if (type === 'bool') {
    return value.toString()
  }
  return value
}
