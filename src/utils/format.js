import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import { KNOWN_ADDRESSES, MINUTES_PER_BLOCK, REVOKED_PERIOD } from '@/utils/constants'

// todo shift indexes
// todo check falling to correct boxes
// todo mozna je problem v else
export function formatNumber(number, maxDecimalDigits = 6, hasFullPrecision = false) {
  const maximumSignificantDigits = 20
  const closeToZeroIndex = parseInt(maxDecimalDigits) + 1
  const zeros = '0'.repeat(maxDecimalDigits)

  const fullPrecisionNumber = number > 1 ? number : Intl.NumberFormat('en-US', { maximumSignificantDigits }).format(number)
  const separatedNumber = numeral(number).format(`0,0.[0000000000000000000]`)
  const abbreviatedNumber = numeral(number).format('0,0.[0]a')
  const roundedNumber = numeral(number).format(`0,0.[${zeros}]`)

  const isNumberRounded = number.toString() !== numeral(abbreviatedNumber).format(`0.[${zeros}]`).toString()
  const isDecimalRounded = fullPrecisionNumber.toString() !== roundedNumber.toString()
  const decimalZeros = (number < 1 && fullPrecisionNumber.includes('.')) ? fullPrecisionNumber.split('.')[1].match(/^0*/)[0].length : 0

  if (hasFullPrecision) {
    const formatted = fullPrecisionNumber < 1000 ? fullPrecisionNumber : separatedNumber
    return { displayNumber: formatted, tooltipNumber: formatted, hasTooltip: false }
  }

  if (parseFloat(number) === 0) {
    return { displayNumber: 0, tooltipNumber: 0, hasTooltip: false }
  }

  if (closeToZeroIndex + 1 <= decimalZeros) {
    console.info('0 - 0.000000000001')
    return { displayNumber: `~0`, tooltipNumber: fullPrecisionNumber, hasTooltip: true }
  }

  if (number < 1000 && maxDecimalDigits + 1 > decimalZeros) {
    console.info('0.000000000001-1')
    const displayNumber = `${isDecimalRounded ? '~' : ''}${roundedNumber}`
    return { displayNumber, tooltipNumber: fullPrecisionNumber, hasTooltip: isDecimalRounded }
  }

  if (number < 1000) {
    console.log('1-1000')
    const displayNumber = `${isNumberRounded ? '~' : ''}${abbreviatedNumber}`
    return { displayNumber, tooltipNumber: separatedNumber, hasTooltip: isNumberRounded }
  } else {
    console.log('1001+')
    const displayNumber = `${isNumberRounded ? '~' : ''}${abbreviatedNumber}`
    return { displayNumber, tooltipNumber: separatedNumber, hasTooltip: true }
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
