<template>
  <app-panel class="microblock-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <copy-chip
        :label="microblockDetails.hash"
        class="microblock-details-panel__chip"/>
      <copy-chip
        :label="formatEllipseHash(microblockDetails.hash)"
        :clipboard-text="microblockDetails.hash"
        class="microblock-details-panel__chip-ellipse"/>
    </template>
    <table>
      <tbody>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            Keyblock
            <hint-tooltip>
              {{ microblocksHints.keyblock }}
            </hint-tooltip>
          </th>
          <td class="microblock-details-panel__data">
            <app-link :to="`/keyblocks/${microblockDetails.prevKeyHash}`">
              <span class="microblock-details-panel__hash">
                {{ microblockDetails.prevKeyHash }}
              </span>
              <span class="microblock-details-panel__hash-ellipse">
                {{ formatEllipseHash(microblockDetails.prevKeyHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            Height
            <hint-tooltip>
              {{ microblocksHints.microblockHeight }}
            </hint-tooltip>
          </th>
          <td class="microblock-details-panel__data">
            <app-link :to="`/keyblocks/${microblockDetails.height}`">
              {{ microblockDetails.height }}
            </app-link>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            Time
            <hint-tooltip>
              {{ microblocksHints.time }}
            </hint-tooltip>
          </th>
          <td class="microblock-details-panel__data">
            <datetime-label :datetime="microblockDetails.time"/>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            Transactions Count
            <hint-tooltip>
              {{ microblocksHints.transactionsCount }}
            </hint-tooltip>
          </th>
          <td class="microblock-details-panel__data">
            {{ formatNumber(microblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            API Links
            <hint-tooltip>
              {{ microblocksHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="microblock-details-panel__data">
            <div class="microblock-details-panel__container">
              <app-link
                :to="microblockNodeUrl"
                class="microblock-details-panel__link">
                <app-icon
                  name="file-cloud"
                  :size="22"/>
                Node
              </app-link>

              <app-link
                :to="microblockMiddlewareUrl"
                class="microblock-details-panel__link">
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
import { microblocksHints } from '@/utils/hints/microblocksHints'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import AppIcon from '@/components/AppIcon'
import AppLink from '@/components/AppLink'
import { formatEllipseHash, formatNumber } from '@/utils/format'

const { NODE_URL, MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  microblockDetails: {
    type: Object,
    required: true,
  },
})

const microblockNodeUrl = computed(() =>
  `${NODE_URL}/v3/micro-blocks/hash/${props.microblockDetails.hash}/header`,
)
const microblockMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/v2/micro-blocks/${props.microblockDetails.hash}`,
)
</script>

<style scoped>
.microblock-details-panel {
  &__table-header {
    border-bottom: 1.5px solid var(--color-midnight-25);
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
}
</style>
