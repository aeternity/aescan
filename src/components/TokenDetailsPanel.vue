<template>
  <app-panel class="token-details-panel">
    <table>
      <tbody>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenSymbol }}
            </hint-tooltip>
            Symbol
          </th>
          <td>
            <div class="token-details-panel__link">
              <token-symbol-icon
                :contract-id="tokenDetails.contractId"
                class="token-details-panel__icon"/>
              <copy-chip :label="tokenDetails.symbol"/>
            </div>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
            Name
          </th>
          <td>
            {{ tokenDetails.name }}
            <not-available-label v-if="!tokenDetails.name"/>
          </td>
        </tr>
        <tr
          v-if="tokenDetails.price"
          class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.price }}
            </hint-tooltip>
            Price
          </th>
          <td>
            {{ formatAePrice(tokenDetails.price) }} ({{ fiatPrice }})
          </td>
        </tr>
        <tr
          v-if="tokenDetails.marketCap"
          class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.marketCap }}
            </hint-tooltip>
            Market cap
          </th>
          <td>
            {{ marketCap }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.totalSupply }}
            </hint-tooltip>
            Total supply
          </th>
          <td>
            {{ formatNumber(tokenDetails.totalSupply) }} {{ tokenDetails.symbol }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.smartContractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td>
            <app-link :to="`/contracts/${tokenDetails.contractId}`">
              <span class="u-hidden-mobile">
                {{ tokenDetails.contractId }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(tokenDetails.contractId) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.decimals }}
            </hint-tooltip>
            Decimals
          </th>
          <td>
            {{ tokenDetails.decimals }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.extensions }}
            </hint-tooltip>
            Extensions
          </th>
          <td>
            <div
              v-if="!!tokenDetails.extensions.length"
              class="token-details-panel__extensions">
              <app-chip
                v-for="extension in tokenDetails.extensions"
                :key="extension"
                size="sm">
                {{ extension }}
              </app-chip>
            </div>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
            <app-link
              v-if="tokenDexUrl"
              :to="tokenDexUrl"
              class="token-details-panel__link">
              <app-icon
                name="file-dex"
                :size="22"/>
              DEX
            </app-link>
            <app-link
              :to="tokenMiddlewareUrl"
              class="token-details-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Middleware
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMarketStatsStore } from '@/stores/marketStats'
import { formatAePrice, formatNumber } from '@/utils/format'
import TokenSymbolIcon from '@/components/TokenSymbolIcon'
import { tokensHints } from '@/utils/hints/tokensHints'

const config = useRuntimeConfig().public
const { price } = storeToRefs(useMarketStatsStore())

const props = defineProps({
  tokenDetails: {
    type: Object,
    required: true,
  },
})

const tokenMiddlewareUrl = computed(() =>
  `${config.MIDDLEWARE_URL}/v2/aex9/${props.tokenDetails.contractId}`,
)

const tokenDexUrl = computed(() =>
  props.tokenDetails.price
    ? `${config.DEX_BACKEND_URL}/tokens/by-address/${props.tokenDetails.contractId}`
    : null,
)

const fiatPrice = computed(() =>
  props.tokenDetails.price && price.value
    ? `$${formatNumber(price.value * props.tokenDetails.price, null, null, 7)}`
    : '---',
)
</script>

<style scoped>
.token-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);

    @media (--desktop) {
      gap: 0 var(--space-1);
    }
  }

  &__icon {
    margin-right: var(--space-1);
    width: 28px;
    height: 28px;

    @media (--desktop) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
