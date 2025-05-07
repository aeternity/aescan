import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import { KNOWN_ADDRESSES, MINUTES_PER_BLOCK, REVOKED_PERIOD } from '@/utils/constants'

// todo remove computed
export function formatNumber(number, roundingIndex = 6, zeroingIndex, hasFullPrecision = false) {
  console.log('--------------------')
  console.log('number', number)

  const zeroing = zeroingIndex ? zeroingIndex : parseInt(roundingIndex) + 1
  const zeros = '0'.repeat(roundingIndex)
  const fullPrecisionNumber = number > 1 ? number : Intl.NumberFormat('en-US', { maximumSignificantDigits: 20 }).format(number)
  const decimalZeros = number < 1 && (!!fullPrecisionNumber.toString().substring(1) && !!fullPrecisionNumber.toString().substring(2)) ? fullPrecisionNumber.toString().substring(2).split('0').length - 1 : 0
  // todo strange condition
  // todo maximumSignificantDigits = max resolution
  const abbreviated = numeral(number).format('0,0.[0]a')
  const roundedNumber = numeral(number).format(`0,0.[${zeros}]`)
  const numberWithCommas = numeral(fullPrecisionNumber).format(`0,0.[0000000000000000000]`)
  const isNumberRounded = number.toString() !== numeral(abbreviated).format(`0.[${zeros}]`).toString()
  if (hasFullPrecision) {
    const formatted = fullPrecisionNumber < 1000 ? fullPrecisionNumber : numberWithCommas
    return { displayNumber: formatted, tooltipNumber: formatted, hasTooltip: false }
  }

  if (parseFloat(number) === 0) {
    return { displayNumber: 0, tooltipNumber: 0, hasTooltip: false }
  }

  if (zeroing + 1 <= decimalZeros) {
    console.info('0 - 0.000000000001')
    return { displayNumber: `~0`, tooltipNumber: fullPrecisionNumber, hasTooltip: true }
  }

  if (fullPrecisionNumber < 1000 && roundingIndex + 1 > decimalZeros) {
    console.info('0.000000000001-1')
    // todo is naming numberWithCommas correct?
    // todo shift indexes
    // todo check falling to correct boxes
    const isrounded = roundedNumber.toString() !== fullPrecisionNumber.toString()
    const displayNumber = `${isrounded ? '~' : ''}${roundedNumber}`
    return { displayNumber, tooltipNumber: fullPrecisionNumber, hasTooltip: false }
  }

  if (fullPrecisionNumber < 1000) {
    console.log('1-1000')
    const displayNumber = `${isNumberRounded ? '~' : ''}${abbreviated}`
    return { displayNumber, tooltipNumber: fullPrecisionNumber, hasTooltip: isNumberRounded }
  } else {
    console.log('1001+')
    // todo is naming numberWithCommas correct?
    // todo chech 770
    // todo remove zeroingIndex completely
    const displayNumber = `${isNumberRounded ? '~' : ''}${abbreviated}`
    return { displayNumber, tooltipNumber: numberWithCommas, hasTooltip: true }
  }
}

// const decimalPlaces = computed(() => {
//   const decimalIndex = fullPrecisionNumber.toString().indexOf('.')
//   return decimalIndex >= 0 ? fullPrecisionNumber.toString().length - decimalIndex - 1 : 0
// })
//
// console.log('decimalPlaces', decimalPlaces.value)
// console.log('fullPrecisionNumber', fullPrecisionNumber)
//

// todo const ABBREVIATION_THRESHOLD = 1000
// todo refactor computed
// todo hastooltip by comparison
// todo try to fixed instead of intl
// todo operators fix
// todo check usage .toString() and parseFloat

//
// export function formatNumber2(number, maxDigits, hasFullPrecision) {
//   const ABBREVIATION_THRESHOLD = 1000
//   const numberFractioned = computed(() => {
//     // todo move this to formatNUmber
//     const maximumSignificantDigits = 8
//     return Intl.NumberFormat('en-US', { maximumSignificantDigits }).format(number)
//   })
//   const numberFullPrecision = computed(() => number > 1 ? number : numberFractioned.value)
//
//   const decimalPlaces = computed(() => {
//     const decimalIndex = numberFullPrecision.value.toString().indexOf('.')
//     return decimalIndex >= 0 ? numberFullPrecision.value.toString().length - decimalIndex - 1 : 0
//   })
//   const numberAbbreviated = computed(() => formatNumber(numberFullPrecision.value, maxDigits, hasFullPrecision))
//   const numberFormatted = computed(() => formatNumber(numberFullPrecision.value, 13, true))
//
//   const isPriceRounded = computed(() => {
//     const zeros = '0'.repeat(decimalPlaces.value)
//     return numberFullPrecision.value.toString() !== numeral(numberabbreviated).format(`0.[${zeros}]`).toString() && numberFullPrecision.value > 1
//   })
//   const isPriceAbbreviated = computed(() => /[a-z]/i.test(numberabbreviated))/* when has letters */
//   const hasTooltip = computed(() => (isPriceabbreviated || isPriceRounded.value) && !hasFullPrecision)
//
//   const tooltipNumber = computed(() => numberFullPrecision.value < ABBREVIATION_THRESHOLD
//     ? numberFullPrecision.value
//     : numberFormatted.value)
//   const displayNumber = computed(() => {
//     if (hasTooltip.value) {
//       return `${isPriceRounded.value ? '~' : ''}${numberFullPrecision.value > 1 ? numberabbreviated : numberFractioned.value}`
//     } else {
//       return numberFullPrecision.value
//     }
//   })
//
//   return { displayNumber, tooltipNumber, hasTooltip: hasTooltip.value }
// }

// export function formatNumber(amount, maxDigits = 6, hasFullPrecision = false) {
//   if (parseFloat(amount) === 0) {
//     return '0'
//   }
//   if (parseFloat(amount) < 1) {
//     const zeros = '0'.repeat(maxDigits - 1)
//     const small = numeral(amount).format(`0.0[${zeros}]`)
//     return small === 'NaN' ? '0' : small
//   }
//
//   const formatted = hasFullPrecision ? numeral(amount).format('0,0') : numeral(amount).format('0,0.[0]a')
//   console.log('formatted', formatted)
//   return formatted === 'NaN' ? amount : formatted
// }

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
