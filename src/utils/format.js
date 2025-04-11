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

import { MINUTES_PER_BLOCK, REVOKED_PERIOD } from '@/utils/constants'

// todo raw
export function formatNumber(amount, maxDigits = 6, hasFullPrecision = false) {
  if (parseFloat(amount) === 0) {
    return '0'
  }
  if (parseFloat(amount) < 1) {
    const zeros = '0'.repeat(maxDigits - 1)
    const small = numeral(amount).format(`0.0[${zeros}]`)
    return small === 'NaN' ? '0' : small
  }
  // todo if nan then ~0

  // todo raw not needed in function
  const formatted = hasFullPrecision ? numeral(amount).format('0,0') : numeral(amount).format('0,0.[0]a')
  return formatted === 'NaN' ? amount : formatted
}

export function formatPercentage(percentage) {
  if (percentage >= 0.00001) {
    // todo check usage formatpercentage on other places eg tokenholders
    return `${formatNumber(percentage, 4)} %`
  }
  if (percentage === 0) {
    return '0 %'
  }
  if (percentage < 0.00001) {
    return '~0 %'
    // todo logic from formatnumber
  }
}

export function formatEllipseHash(hash) {
  const prefix = hash.slice(0, 10)
  const suffix = hash.slice(hash.length - 2)
  return `${prefix}...${suffix}`
}

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

//
// export function formatTokenValue(amount, tokenAePrice, aeFiatPrice) {
//   // todo is this necessary?
//   // todo other similar
//   if (tokenAePrice === null) {
//     return null
//   }
//
//   const bigNumber = (new BigNumber(amount)).multipliedBy(tokenAePrice).multipliedBy(aeFiatPrice)
//   const decimalPlaces = bigNumber.e
//   const digitsCount = bigNumber.c?.[0].toString().length
//   if (decimalPlaces & digitsCount) {
//     return formatNumber(bigNumber.toFixed(digitsCount - decimalPlaces - 1))
//   }
//   return null
// }

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
    return fromAmount / toAmount
  }
  if (action === 'SELL') {
    return (toAmount / fromAmount)
  }
  return null
}

export function formatTradeValue(action, fromAmount, toAmount, price) {
  if (action === 'BUY') {
    return fromAmount * price
  }
  if (action === 'SELL') {
    return toAmount * price
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
