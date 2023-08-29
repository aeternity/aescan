import { DateTime } from 'luxon'
import { toAe } from '@aeternity/aepp-sdk'
import { BigNumber } from 'bignumber.js'
import { MAXIMUM_FRACTION_DIGITS, MINUTES_PER_BLOCK, NUMBER_FRACTION_THRESHOLD } from '@/utils/constants'

export function formatEllipseHash(hash) {
  const prefix = hash.slice(0, 10)
  const suffix = hash.slice(hash.length - 2)
  return `${prefix}...${suffix}`
}

export function formatNumber(number, minimumFractionDigits = 0, maximumSignificantDigits = 4) {
  if (isNaN(number) || number === null) {
    return number
  }
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: number >= NUMBER_FRACTION_THRESHOLD ? 0 : minimumFractionDigits,
    maximumSignificantDigits,
  }).format(number)
}

export function formatAePrice(price, maxDigits = 8) {
  if (isNaN(price) || price === null) {
    return price
  }

  if (maxDigits === null) {
    return `${formatNumber(price, 0, MAXIMUM_FRACTION_DIGITS)} AE`
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
    return integers === '0' && decimals !== '' ? `~${integers} AE` : `${formatNumber(integers)} AE`
  }

  return `${formatNumber(truncatedPrice, decimals.length, maxDigits)} AE`
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
  return value || '---'
}

export function formatDecodeBase64(base64String) {
  return process.client ? window.atob(base64String) : Buffer.from(base64String, 'base64').toString('utf8')
}

export function formatDecodeByteArray(bytesArray) {
  return String.fromCharCode(...bytesArray)
}
