<template>
  <app-panel class="keyblock-details-panel">
    <header class="keyblock-details-panel__header">
      <h2 class="keyblock-details-panel__heading h3">
        DETAILS
      </h2>
      <div>
        <copy-chip
          :label="keyblockDetails.hash"
          class="keyblock-details-panel__chip"/>
        <copy-chip
          :label="formatEllipseHash(keyblockDetails.hash)"
          :clipboard-text="keyblockDetails.hash"
          class="keyblock-details-panel__chip-ellipse"/>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="keyblock-details-panel__row">
          <th class="keyblock-details-panel__table-header">
            Keyblock Height
          </th>
          <td class="keyblock-details-panel__data">
            {{ keyblockDetails.height }}
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
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import { formatAePrice, formatEllipseHash, formatNumber } from '@/utils/format'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

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
}
</style>
