<template>
  <app-panel class="state-channel-details-panel">
    <table>
      <tbody>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.stateChannelId }}
            </hint-tooltip>
            State Channel ID
          </th>
          <td>
            <div class="u-hidden-mobile">
              <copy-chip :label="stateChannelDetails.id"/>
            </div>
            <div class="u-hidden-desktop">
              <copy-chip
                :label="formatEllipseHash(stateChannelDetails.id)"
                :clipboard-text="stateChannelDetails.id"/>
            </div>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.status }}
            </hint-tooltip>
            Status
          </th>
          <td>
            <app-chip :variant="stateChannelDetails.isOpen ? 'success' : 'primary'">
              {{ stateChannelDetails.isOpen ? 'Open' : 'Closed' }}
            </app-chip>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.createTransaction }}
            </hint-tooltip>
            Create Transaction
          </th>
          <td>
            <app-link :to="`/transactions/${stateChannelDetails.createTransactionHash}`">
              <span class="u-hidden-mobile">
                {{ stateChannelDetails.createTransactionHash }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(stateChannelDetails.createTransactionHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.initialAmount }}
            </hint-tooltip>
            Initial Amount
          </th>
          <td>
            <price-label :price="stateChannelDetails.initialAmount"/>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.initiator }}
            </hint-tooltip>
            Initiator
          </th>
          <td>
            <app-link :to="`/accounts/${stateChannelDetails.initiator}`">
              <span class="u-hidden-mobile">
                {{ stateChannelDetails.initiator }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(stateChannelDetails.initiator) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.responder }}
            </hint-tooltip>
            Responder
          </th>
          <td>
            <app-link :to="`/accounts/${stateChannelDetails.responder}`">
              <span class="u-hidden-mobile">
                {{ stateChannelDetails.responder }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(stateChannelDetails.responder) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.onChainUpdates }}
            </hint-tooltip>
            On-Chain TXs
          </th>
          <td>
            {{ formatNumber(stateChannelDetails.onChainUpdates) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastKnownRound }}
            </hint-tooltip>
            Last Known Round
          </th>
          <td>
            {{ formatNumber(stateChannelDetails.lastKnownRound) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.locked }}
            </hint-tooltip>
            Locked
          </th>
          <td>
            <price-label :price="stateChannelDetails.aeLocked"/>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdatedHeight }}
            </hint-tooltip>
            Last Updated Height
          </th>
          <td>
            <app-link
              v-if="stateChannelDetails.lastUpdatedHeight"
              :to="`/keyblocks/${stateChannelDetails.lastUpdatedHeight}`">
              {{ stateChannelDetails.lastUpdatedHeight }}
            </app-link>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
            Last Updated
          </th>
          <td>
            <timestamp-label
              v-if="stateChannelDetails.lastUpdated"
              :timestamp="stateChannelDetails.lastUpdated"
              :is-extended="true"/>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastTxType }}
            </hint-tooltip>
            Last TX Type
          </th>
          <td>
            {{ stateChannelDetails.lastTxType }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.apiLinks }}
            </hint-tooltip>
            API Links
          </th>
          <td>
            <app-link
              :to="stateChannelMiddlewareUrl"
              class="state-channel-details-panel__link">
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
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import AppLink from '@/components/AppLink'
import AppChip from '@/components/AppChip'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'

const { MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  stateChannelDetails: {
    type: Object,
    required: true,
  },
})

const stateChannelMiddlewareUrl = `${MIDDLEWARE_URL}/v3/channels/${props.stateChannelDetails.id}`
</script>

<style scoped>
.state-channel-details-panel {
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
  }
}
</style>
