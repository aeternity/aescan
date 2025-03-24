<template>
  <app-panel class="token-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
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
        <tr>
          <th>
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
        <tr v-if="tokenDetails.price">
          <th>
            <hint-tooltip>
              {{ tokensHints.price }}
            </hint-tooltip>
            AE Price
          </th>
          <td>
            <div class="token-details-panel__container">
              <price-label :price="tokenDetails.price"/>
            </div>
          </td>
        </tr>
        <tr v-if="tokenDetails.price">
          <th>
            <hint-tooltip>
              {{ tokensHints.price }}
            </hint-tooltip>
            Fiat Price
          </th>
          <td>
            <div class="token-details-panel__container">
              {{ fiatPrice }}
            </div>
          </td>
        </tr>
        <tr v-if="tokenDetails.marketCap">
          <th>
            <hint-tooltip>
              {{ tokensHints.marketCap }}
            </hint-tooltip>
            Market cap
          </th>
          <td>
            {{ marketCap }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ tokensHints.totalSupply }}
            </hint-tooltip>
            Total supply
          </th>
          <td>
            <price-label
              :price="tokenDetails.totalSupply"
              :currency="tokenDetails.symbol"
              :contract-id="tokenDetails.contractId"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ tokensHints.smartContractId }}
            </hint-tooltip>
            Smart Contract ID
          </th>
          <td>
            <app-link :to="`/contracts/${tokenDetails.contractId}`">
              {{ tokenDetails.contractId }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ tokensHints.decimals }}
            </hint-tooltip>
            Decimals
          </th>
          <td>
            {{ tokenDetails.decimals }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ tokensHints.holders }}
            </hint-tooltip>
            Token Holders
          </th>
          <td>
            {{ tokenHoldersCount }}
          </td>
        </tr>
        <tr>
          <th>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ tokensHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
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
  `${config.MIDDLEWARE_URL}/aex9/${props.tokenDetails.contractId}`,
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
@import url("../assets/styles/utilities/panel-detail.css");

.token-details-panel {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
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
