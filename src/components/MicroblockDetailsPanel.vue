<template>
  <app-panel class="microblock-details-panel">
    <table>
      <tbody>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.microblockId }}
            </hint-tooltip>
            Hash
          </th>
          <td class="microblock-details-panel__data">
            <div class="u-hidden-mobile">
              <copy-chip :label="microblockDetails.hash"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(microblockDetails.hash)"
                :clipboard-text="microblockDetails.hash"/>
            </div>
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.keyblock }}
            </hint-tooltip>
            Keyblock
          </th>
          <td class="microblock-details-panel__data">
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
          <td class="microblock-details-panel__data">
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
            Created
          </th>
          <td class="microblock-details-panel__data">
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
          <td class="microblock-details-panel__data">
            {{ formatNumber(microblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.gas }}
            </hint-tooltip>
            Gas Limit
          </th>
          <td class="microblock-details-panel__data">
            {{ microblockDetails.gas }}
          </td>
        </tr>
        <tr class="microblock-details-panel__row">
          <th class="microblock-details-panel__table-header">
            <hint-tooltip>
              {{ microblocksHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td class="microblock-details-panel__data">
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
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { microblocksHints } from '@/utils/hints/microblocksHints'

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
}
</style>
