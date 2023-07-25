<template>
  <app-panel class="keyblock-details-panel">
    <header class="keyblock-details-panel__header">
      <h2 class="keyblock-details-panel__heading h3">
        DETAILS
      </h2>
      <div v-if="!keyblockDetails.notExistent">
        <copy-chip
          :label="keyblockDetails.hash"
          class="keyblock-details-panel__chip"/>
        <copy-chip
          :label="formatEllipseHash(keyblockDetails.hash)"
          :clipboard-text="keyblockDetails.hash"
          class="keyblock-details-panel__chip-ellipse"/>
      </div>
    </header>
    <p
      v-if="keyblockDetails.notExistent"
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
          </th>
          <td class="keyblock-details-panel__data">
            <div class="keyblock-details-panel__controls">
              <app-link :to="`/keyblocks/${keyblockDetails.height - 1}`">
                <button
                  :class="[
                    'keyblock-details-panel__button',
                    'keyblock-details-panel__button--prev',
                  ]">
                  <app-icon
                    :size="22"
                    name="caret-left"/>
                </button>
              </app-link>
              {{ keyblockDetails.height }}
              <app-link :to="`/keyblocks/${keyblockDetails.height + 1}`">
                <button
                  :class="[
                    'keyblock-details-panel__button',
                    'keyblock-details-panel__button--next',
                  ]"
                  :disabled="!isNextKeyblockMined">
                  <app-icon
                    :size="22"
                    name="caret-right"/>
                </button>
              </app-link>
            </div>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Time
          </th>
          <td class="keyblock-details-panel__data">
            <datetime-label :datetime="keyblockDetails.mined"/>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Miner
          </th>
          <td class="keyblock-details-panel__data">
            <span class="keyblock-details-panel__hash">
              {{ keyblockDetails.miner }}
            </span>
            <span class="keyblock-details-panel__hash-ellipse">
              {{ formatEllipseHash(keyblockDetails.miner) }}
            </span>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Beneficiary
          </th>
          <td class="keyblock-details-panel__data">
            <app-link :to="`/accounts/${keyblockDetails.beneficiary}`">
              <span class="keyblock-details-panel__hash">
                {{ keyblockDetails.beneficiary }}
              </span>
              <span class="keyblock-details-panel__hash-ellipse">
                {{ formatEllipseHash(keyblockDetails.beneficiary) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Beneficiary Reward
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatAePrice(keyblockDetails.block_reward, null) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            BRI Reward
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatAePrice(keyblockDetails.dev_reward, null) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Microblocks Count
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.micro_blocks_count) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Transactions Count
          </th>
          <td class="keyblock-details-panel__data">
            {{ formatNumber(keyblockDetails.transactions_count) }}
          </td>
        </tr>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            API Links
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
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import { formatAePrice, formatEllipseHash, formatNumber } from '@/utils/format'
import { useRecentBlocksStore } from '~/stores/recentBlocks'

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
  padding: var(--space-4) var(--space-1) var(--space-3);
  margin-bottom: var(--space-7);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
    margin-bottom: var(--space-6);
  }

  &__header {
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__heading {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__chip,
  &__hash {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }

  &__chip-ellipse,
  &__hash-ellipse {
    @media (--desktop) {
      display: none;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
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
    margin: var(--space-3) 0;
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__button {
    width: 32px;
    height: 32px;

    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid var(--color-midnight);
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &--next {
      margin-left: var(--space-6);
    }

    &--prev {
      margin-right: var(--space-6);
    }
  }
}
</style>
