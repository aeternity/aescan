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
            Keyblock Hash
          </th>
          <td>
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
          <td>
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
          <td>
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
          <td>
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
          <td>
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
            Beneficiary Reward
          </th>
          <td>
            <price-label :price="keyblockDetails.blockReward"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.briReward }}
            </hint-tooltip>
            BRI Reward
          </th>
          <td>
            <price-label :price="keyblockDetails.devReward"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            <hint-tooltip>
              {{ keyblocksHints.microblockCount }}
            </hint-tooltip>
            Microblocks Count
          </th>
          <td>
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
          <td>
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
          <td>
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
import { storeToRefs } from 'pinia'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import PaginationButton from '@/components/PaginationButton'
import AppLink from '@/components/AppLink'
import { formatEllipseHash, formatNumber } from '@/utils/format'
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
  `${MIDDLEWARE_URL}/v3/key-blocks/${props.keyblockDetails.hash}`,
)
const isNextKeyblockMined = computed(() =>
  props.keyblockDetails.height < latestBlockHeight.value,
)
</script>

<style scoped>
.keyblock-details-panel {
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
