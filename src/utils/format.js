import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import { KNOWN_ADDRESSES, MINUTES_PER_BLOCK, REVOKED_PERIOD } from '@/utils/constants'

// todo rename
export function formatNumber2(number, maxDigits, hasFullPrecision) {
  const ABBREVIATION_THRESHOLD = 1000
  const numberFullPrecision = computed(() => number > 1 ? number : numberFractioned.value)

  const decimalPlaces = computed(() => {
    const decimalIndex = number.toString().indexOf('.')
    return decimalIndex >= 0 ? number.toString().length - decimalIndex - 1 : 0
  })
  const numberAbbreviated = computed(() => formatNumber(number, maxDigits, hasFullPrecision))
  const numberFormatted = computed(() => formatNumber(number, 13, true))
  const numberFractioned = computed(() => {
    // todo move this to formatNUmber
    const maximumSignificantDigits = 8
    return Intl.NumberFormat('en-US', { maximumSignificantDigits }).format(number)
  })
  // todo ~0
  // todo reuse format function
  const isPriceRounded = computed(() => {
    const zeros = '0'.repeat(decimalPlaces.value)
    return number.toString() !== numeral(numberAbbreviated.value).format(`0.[${zeros}]`).toString() && number > 1
  })
  const isPriceAbbreviated = computed(() => /[a-z]/i.test(numberAbbreviated.value))/* when has letters */
  const hasTooltip = computed(() => (isPriceAbbreviated.value || isPriceRounded.value) && !hasFullPrecision)

  const tooltipPrice = computed(() => number < ABBREVIATION_THRESHOLD ? number : numberFormatted.value)
  const displayPrice = computed(() => {
    if (hasTooltip.value) {
      return `${isPriceRounded.value ? '~' : ''}${number > 1 ? numberAbbreviated.value : numberFractioned.value}`
    } else {
      return numberFullPrecision.value
    }
  })

  return { displayPrice, tooltipPrice, hasTooltip: hasTooltip.value }
}

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
