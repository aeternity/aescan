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
          <td class="token-details-panel__data">
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
          <td class="token-details-panel__data">
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
            AE Price
          </th>
          <td class="token-details-panel__data">
            <div class="token-details-panel__container">
              <price-label :price="tokenDetails.price"/>
            </div>
          </td>
        </tr>
        <tr
          v-if="tokenDetails.price"
          class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.price }}
            </hint-tooltip>
            Fiat Price
          </th>
          <td class="token-details-panel__data">
            <div class="token-details-panel__container">
              {{ fiatPrice }}
            </div>
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
          <td class="token-details-panel__data">
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
          <td class="token-details-panel__data">
            <price-label
              :price="tokenDetails.totalSupply"
              :currency="tokenDetails.symbol"
              :contract-id="tokenDetails.contractId"/>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.smartContractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td class="token-details-panel__data">
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
          <td class="token-details-panel__data">
            {{ tokenDetails.decimals }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.holders }}
            </hint-tooltip>
            Token Holders
          </th>
          <td class="token-details-panel__data">
            {{ tokenHoldersCount }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            <hint-tooltip>
              {{ tokensHints.extensions }}
            </hint-tooltip>
            Extensions
          </th>
          <td class="token-details-panel__data">
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
          <td class="token-details-panel__data">
            <app-link
              v-if="featureFlags.dex && tokenDexUrl"
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
import { tokensHints } from '@/utils/hints/tokensHints'

const config = useRuntimeConfig().public
const { price } = storeToRefs(useMarketStatsStore())
const featureFlags = useFeatureFlags()

const props = defineProps({
  tokenDetails: {
    type: Object,
    required: true,
  },
  tokenHoldersCount: {
    type: Number,
    required: true,
  },
})

const tokenMiddlewareUrl = computed(() =>
  `${config.MIDDLEWARE_URL}/v3/aex9/${props.tokenDetails.contractId}`,
)

const tokenDexUrl = computed(() =>
  props.tokenDetails.price
    ? `${config.DEX_BACKEND_URL}/tokens/by-address/${props.tokenDetails.contractId}`
    : null,
)

const fiatPrice = computed(() =>
  props.tokenDetails.price && price.value
    ? `$${formatNumber(price.value * props.tokenDetails.price, null, null, 7)}`
    : 'N/A',
)
</script>

<style scoped>
.token-details-panel {
  &__table-header {
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;
    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__data {
    display: block;
    padding-left: 20px;
    @media (--mobile) {
      display: table-cell;
    }
  }

  &__container {
    display: flex;
    gap: var(--space-2) var(--space-1);
  }

  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  &__icon {
    margin-right: var(--space-1);
    width: 28px;
    height: 28px;
  }
}
</style>
