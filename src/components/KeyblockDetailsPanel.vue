<template>
  <app-panel class="keyblock-details-panel">
    <p
      v-if="keyblockDetails.isExistent === false"
      class="keyblock-details-panel__not-existent">
      Requested keyblock has never been seen in the network.
      <br>
      Details will be displayed here after it is mined.
    </p>
    <table v-else>
      <tbody>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.keyblockHash }}
            </hint-tooltip>
            Hash
          </th>
          <td class="keyblock-details-panel__data">
            <div class="u-hidden-mobile">
              <copy-chip :label="keyblockDetails.hash"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(keyblockDetails.hash)"
                :clipboard-text="keyblockDetails.hash"/>
            </div>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.height }}
            </hint-tooltip>
            Height
          </th>
          <td class="keyblock-details-panel__data">
            <div class="keyblock-details-panel__controls">
              <pagination-button
                class="keyblock-details-panel__button--prev"
                direction="left"
                :disabled="keyblockDetails.height === 0"
                @click="$router.push(`/keyblocks/${keyblockDetails.height - 1}`)"/>

              {{ keyblockDetails.height }}

              <pagination-button
                class="keyblock-details-panel__button--next"
                direction="right"
                :disabled="!isNextKeyblockMined"
                @click="$router.push(`/keyblocks/${keyblockDetails.height + 1}`)"/>
            </div>
          </td>
        </tr>

        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.mined }}
            </hint-tooltip>
            Time
          </th>
          <td class="keyblock-details-panel__data">
            <timestamp-label
              :timestamp="keyblockDetails.mined"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.miner }}
            </hint-tooltip>
            Miner
          </th>
          <td class="keyblock-details-panel__data">
            <span class="u-hidden-mobile">
              {{ keyblockDetails.miner }}
            </span>
            <span class="u-hidden-desktop">
              {{ formatEllipseHash(keyblockDetails.miner) }}
            </span>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.beneficiary }}
            </hint-tooltip>
            Beneficiary
          </th>
          <td class="keyblock-details-panel__data">
            <app-link :to="`/accounts/${keyblockDetails.beneficiary}`">
              <span class="u-hidden-mobile">
                {{ keyblockDetails.beneficiary }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(keyblockDetails.beneficiary) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.beneficiaryReward }}
            </hint-tooltip>
            Reward
          </th>
          <td class="keyblock-details-panel__data">
            <price-label :price="keyblockDetails.blockReward"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.microblockCount }}
            </hint-tooltip>
            Microblocks Count
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.microBlocksCount) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.transactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td class="keyblock-details-panel__data">
            <app-link
              :to="keyblockNodeUrl"
              class="keyblock-details-panel__link">
              <app-icon
                name="file-cloud"
                :size="22"/>
              Node
            </app-link>

            <app-link
              :to="keyblockMiddlewareUrl"
              class="keyblock-details-panel__link">
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
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
const { blockHeight: latestBlockHeight } = storeToRefs(useRecentBlocksStore())

const props = defineProps({
  keyblockDetails: {
    type: Object,
    required: true,
  },
})

const keyblockNodeUrl = computed(() =>
  `${NODE_URL}/key-blocks/hash/${props.keyblockDetails.hash}`,
)
const keyblockMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/key-blocks/${props.keyblockDetails.hash}`,
)
const isNextKeyblockMined = computed(() =>
  props.keyblockDetails.height < latestBlockHeight.value,
)
</script>

<style scoped>
.keyblock-details-panel {
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

  &__data {
    display: block;
    padding-left: 20px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }

  &__not-existent {
    margin: 0 0 var(--space-3) 0;
  }

  &__controls {
    display: flex;
    align-items: center;
  }

  &__button {
    &--next {
      margin-left: var(--space-1);

      @media (--desktop) {
        margin-left: var(--space-3);
      }
    }

    &--prev {
      margin-right: var(--space-1);

      @media (--desktop) {
        margin-right: var(--space-3);
      }
    }
  }
}
</style>
