import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import {
  MAXIMUM_FRACTION_DIGITS,
  MINUTES_PER_BLOCK,
  NUMBER_FRACTION_THRESHOLD,
  REVOKED_PERIOD,
} from '@/utils/constants'

export function formatEllipseHash(hash) {
  const prefix = hash.slice(0, 10)
  const suffix = hash.slice(hash.length - 2)
  return `${prefix}...${suffix}`
}

export function formatNumber(
  number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 5,
  maximumSignificantDigits = null) {
  if (isNaN(number) || number === null) {
    return number
  }

  if (maximumSignificantDigits !== null) {
    return Intl.NumberFormat('en-US', {
      maximumSignificantDigits,
    }).format(number)
  }

  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: number >= NUMBER_FRACTION_THRESHOLD ? 0 : minimumFractionDigits,
    maximumFractionDigits: number >= NUMBER_FRACTION_THRESHOLD ? 0 : maximumFractionDigits,
  }).format(number)
}

export function formatAePrice(price, maxDigits = 8, currency = 'AE') {
  if (isNaN(price) || price === null) {
    return price
  }

  if (maxDigits === null) {
    return `${formatNumber(price, 0, MAXIMUM_FRACTION_DIGITS)} ${currency}`
  }

  const truncatedPrice = new BigNumber(price).toFixed(
    maxDigits,
    BigNumber.ROUND_DOWN,
  )

  const priceParts = truncatedPrice.split('.')
  const integers = priceParts[0]
  let decimals = priceParts[1]

  decimals = decimals?.replace(/0+$/, '')

  if (!decimals) {
    if (price === 0) {
      return `0 ${currency}`
    }
    if (integers === '0') {
      return `~${integers} ${currency}`
    } else {
      return `${formatNumber(integers)} ${currency}`
    }
  }

  return `${formatNumber(truncatedPrice, decimals.length, maxDigits)} ${currency}`
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
  const now = DateTime.now().setLocale('en-US')
  const heightDiff = expirationHeight - currentBlockHeight
  return now.plus({ minutes: heightDiff * MINUTES_PER_BLOCK })
}

export function formatNullable(value) {
  if (value === 0) {
    return value
  }
  if (!value) {
    return '---'
  }
  return value || '---'
}

export function formatDecodeBase64(base64String) {
  return process.client ? window.atob(base64String) : Buffer.from(base64String, 'base64').toString('utf8')
}

export function formatDecodeByteArray(bytesArray) {
  return String.fromCharCode(...bytesArray)
}

export function formatNameState(name, blockHeight) {
  const isInAuction = name.status === 'auction'
  const isActive = name.active
  const isExpired = name.status === 'name' && !name.active
  const isRevoked = isExpired && name.active === false &&
    name.info.expireHeight + REVOKED_PERIOD > blockHeight

  if (isInAuction) {
    return 'auction'
  } else if (isRevoked) {
    return 'revoked'
  } else if (isExpired) {
    return 'expired'
  } else if (isActive) {
    return 'active'
  }
}

export function formatIsAuction(name) {
  const auctionLength = 13
  const suffixLength = 6
  return name.length - suffixLength < auctionLength
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
