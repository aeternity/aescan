<template>
  <app-panel class="token-details-panel">
    <header class="token-details-panel__header">
      <h3 class="token-details-panel__heading">
        DETAILS
      </h3>
      <div class="token-details-panel__container">
        <copy-chip :label="tokenDetails.symbol"/>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Name
          </th>
          <td class="token-details-panel__data">
            {{ tokenDetails.name }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Price
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.price }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Market cap
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.marketCap }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Total supply
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.totalSupply }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Holders
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.holders }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Hash
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.hash }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Amount of tokens
          </th>
          <td class="token-details-panel__data">
            <!-- {{ tokenDetails.amountOfTokens }} -->
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Contract
          </th>
          <td class="token-details-panel__data">
            <app-link :to="`/contracts/${tokenDetails.contract_id}`">
              {{ tokenDetails.contract_id }}
            </app-link>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Decimals
          </th>
          <td class="token-details-panel__data">
            {{ tokenDetails.decimals }}
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            Extensions
          </th>
          <td class="token-details-panel__data">
            <app-chip
              v-for="extension in tokenDetails.extensions"
              :key="extension"
              size="sm"
              class="token-details-panel__extension-chip">
              {{ extension }}
            </app-chip>
          </td>
        </tr>
        <tr class="token-details-panel__row">
          <th class="token-details-panel__table-header">
            API links
          </th>
          <td class="token-details-panel__data">
            <div class="token-details-panel__container">
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
const config = useRuntimeConfig().public

const props = defineProps({
  tokenDetails: {
    type: [Object, null],
    default: null,
  },
})

const tokenMiddlewareUrl = computed(
  () => `${config.MIDDLEWARE_URL}/v2/aex9/${props.tokenDetails.contract_id}`,
)
</script>

<style scoped>
.token-details-panel {
  padding: var(--space-4) var(--space-1) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
  }

  &__heading {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: 0.03em;
    margin-bottom: var(--space-3);
    @media (--desktop) {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 0;
    }
  }

  &__header {
    @media (--desktop) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
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

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }

  &__extension-chip {
    margin-left: var(--space-1);
  }

  &__hash {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
