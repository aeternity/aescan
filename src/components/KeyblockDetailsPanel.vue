<template>
  <app-panel class="keyblock-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <div v-if="!!keyblockDetails.isExistent">
        <copy-chip
          :label="keyblockDetails.hash"
          class="u-hidden-mobile"/>
        <copy-chip
          :label="formatEllipseHash(keyblockDetails.hash)"
          :clipboard-text="keyblockDetails.hash"
          class="u-hidden-desktop"/>
      </div>
    </template>
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
            Height
            <hint-tooltip>
              {{ keyblocksHints.height }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            <div class="keyblock-details-panel__controls">
              <pagination-button
                class="keyblock-details-panel__button--prev"
                direction="left"
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
            Time
            <hint-tooltip>
              {{ keyblocksHints.mined }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            <datetime-label :datetime="keyblockDetails.mined"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Miner
            <hint-tooltip>
              {{ keyblocksHints.miner }}
            </hint-tooltip>
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
            Beneficiary
            <hint-tooltip>
              {{ keyblocksHints.beneficiary }}
            </hint-tooltip>
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
            Beneficiary Reward
            <hint-tooltip>
              {{ keyblocksHints.beneficiaryReward }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatAePrice(keyblockDetails.blockReward, null) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            BRI Reward
            <hint-tooltip>
              {{ keyblocksHints.briReward }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatAePrice(keyblockDetails.devReward, null) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Microblocks Count
            <hint-tooltip>
              {{ keyblocksHints.microblockCount }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.microBlocksCount) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Transactions Count
            <hint-tooltip>
              {{ keyblocksHints.transactionsCount }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            API Links
            <hint-tooltip>
              {{ keyblocksHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="keyblock-details-panel__data">
            <div class="keyblock-details-panel__container">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import PaginationButton from '@/components/PaginationButton'
import AppLink from '@/components/AppLink'
import { formatAePrice, formatEllipseHash, formatNumber } from '@/utils/format'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public
const { blockHeight: latestBlockHeight } = storeToRefs(useRecentBlocksStore())

const props = defineProps({
  keyblockDetails: {
    type: Object,
    required: true,
  },
})

const keyblockNodeUrl = computed(() =>
  `${NODE_URL}/v3/key-blocks/hash/${props.keyblockDetails.hash}`,
)
const keyblockMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/v2/key-blocks/${props.keyblockDetails.hash}`,
)
const isNextKeyblockMined = computed(() =>
  props.keyblockDetails.height < latestBlockHeight.value,
)
</script>

<style scoped>
.keyblock-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }

  &__container {
    display: flex;
    justify-content: flex-end;
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
    justify-content: flex-end;
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
