<template>
  <app-panel class="microblock-details-panel">
    <table>
      <tbody>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.keyblock }}
            </hint-tooltip>
            Microblock ID
          </th>
          <td>
            <copy-chip
              :label="microblockDetails.hash"
              class="u-hidden-mobile"/>
            <copy-chip
              :label="formatEllipseHash(microblockDetails.hash)"
              :clipboard-text="microblockDetails.hash"
              class="u-hidden-desktop"/>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.keyblock }}
            </hint-tooltip>
            Keyblock
          </th>
          <td>
            <app-link :to="`/keyblocks/${microblockDetails.prevKeyHash}`">
              <span class="u-hidden-mobile">
                {{ microblockDetails.prevKeyHash }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(microblockDetails.prevKeyHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.microblockHeight }}
            </hint-tooltip>
            Height
          </th>
          <td>
            <app-link :to="`/keyblocks/${microblockDetails.height}`">
              {{ microblockDetails.height }}
            </app-link>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.time }}
            </hint-tooltip>
            Created Height
          </th>
          <td>
            <timestamp-label
              :timestamp="microblockDetails.time"
              :is-extended="true"/>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.transactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td>
            {{ formatNumber(microblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
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
  `${MIDDLEWARE_URL}/v3/micro-blocks/${props.microblockDetails.hash}`,
)
</script>

<style scoped>
.microblock-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
    font-weight: normal;

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__container {
    display: flex;
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
