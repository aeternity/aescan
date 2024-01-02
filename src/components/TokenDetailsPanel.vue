<template>
  <app-panel class="token-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <div class="token-details-panel__token">
        <token-symbol-icon
          :contract-id="tokenDetails.contractId"
          class="token-details-panel__icon"/>
        <copy-chip :label="tokenDetails.symbol"/>
      </div>
    </template>

    <table>
      <tbody>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Name
            <hint-tooltip>
              {{ tokensHints.tokenName }}
            </hint-tooltip>
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
            Price
            <hint-tooltip>
              {{ tokensHints.price }}
            </hint-tooltip>
          </th>
          <td class="token-details-panel__data">
            <div class="token-details-panel__container">
              <price-label :price="tokenDetails.price"/>
              ({{ fiatPrice }})
            </div>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Total supply
            <hint-tooltip>
              {{ tokensHints.totalSupply }}
            </hint-tooltip>
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
            Smart Contract ID
            <hint-tooltip>
              {{ tokensHints.smartContractId }}
            </hint-tooltip>
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
            Decimals
            <hint-tooltip>
              {{ tokensHints.decimals }}
            </hint-tooltip>
          </th>
          <td class="token-details-panel__data">
            {{ tokenDetails.decimals }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Extensions
            <hint-tooltip>
              {{ tokensHints.extensions }}
            </hint-tooltip>
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
            API Links
            <hint-tooltip>
              {{ tokensHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="token-details-panel__data">
            <div class="token-details-panel__container">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMarketStatsStore } from '@/stores/marketStats'
import { formatNumber } from '@/utils/format'
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
  }

  &__data {
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__container {
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-1);
    margin-bottom: var(--space-1);

    @media (--desktop) {
      justify-content: flex-end;
      margin-bottom: 0;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__extensions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    justify-content: flex-end;
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

  &__token {
    display: flex;
    align-items: center;

  }
}
</style>
