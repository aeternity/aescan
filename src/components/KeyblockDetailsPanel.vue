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
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.keyblockHash }}
            </hint-tooltip>
            Hash
          </th>
          <td>
            <copy-chip :label="keyblockDetails.hash"/>
          </td>
        </tr>
        <tr>
          <th>
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

        <tr>
          <th>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.miner }}
            </hint-tooltip>
            Miner
          </th>
          <td>
            {{ keyblockDetails.miner }}
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.beneficiary }}
            </hint-tooltip>
            Beneficiary
          </th>
          <td>
            <app-link :to="`/accounts/${keyblockDetails.beneficiary}`">
              {{ keyblockDetails.beneficiary }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.beneficiaryReward }}
            </hint-tooltip>
            Reward
          </th>
          <td>
            <price-label
              :price="keyblockDetails.blockReward"
              is-raw/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.microblockCount }}
            </hint-tooltip>
            Microblocks Count
          </th>
          <td>
            <number-label :number="keyblockDetails.microBlocksCount"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ keyblocksHints.transactionsCount }}
            </hint-tooltip>
            Transactions Count
          </th>
          <td>
            <number-label :number="keyblockDetails.transactionsCount"/>
          </td>
        </tr>
        <tr>
          <th>
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
@import url("../assets/styles/utilities/_detail-table.css");

.keyblock-details-panel {
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
