<template>
  <app-panel class="microblock-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ microblocksHints.microblockId }}
            </hint-tooltip>
            Hash
          </th>
          <td>
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
        <tr>
          <th>
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
        <tr>
          <th>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ microblocksHints.time }}
            </hint-tooltip>
            Created
          </th>
          <td>
            <timestamp-label
              :timestamp="microblockDetails.time"
              :is-extended="true"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ microblocksHints.transactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td>
            {{ formatNumber(microblockDetails.transactionsCount) }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ microblocksHints.gas }}
            </hint-tooltip>
            Gas Limit
          </th>
          <td>
            {{ microblockDetails.gas }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ microblocksHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
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
  `${NODE_URL}/micro-blocks/hash/${props.microblockDetails.hash}/header`,
)
const microblockMiddlewareUrl = computed(() =>
  `${MIDDLEWARE_URL}/micro-blocks/${props.microblockDetails.hash}`,
)
</script>

<style scoped>
@import url("../assets/styles/utilities/_detail-table.css");

.microblock-details-panel {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
