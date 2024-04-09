<template>
  <app-panel class="state-channel-details-panel">
    <template #heading>
      DETAILS
    </template>
    <template #header>
      <copy-chip
        :label="stateChannelDetails.id"
        class="u-hidden-mobile"/>
      <copy-chip
        :label="formatEllipseHash(stateChannelDetails.id)"
        :clipboard-text="stateChannelDetails.id"
        class="u-hidden-desktop"/>
    </template>

    <table>
      <tbody>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Status
            <hint-tooltip>
              {{ stateChannelsHints.status }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            <app-chip :variant="stateChannelDetails.isOpen ? 'success' : 'primary'">
              {{ stateChannelDetails.isOpen ? 'Open' : 'Closed' }}
            </app-chip>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Create Transaction
            <hint-tooltip>
              {{ stateChannelsHints.createTransaction }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
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
            Initial Amount
            <hint-tooltip>
              {{ stateChannelsHints.initialAmount }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatAePrice(stateChannelDetails.initialAmount, null) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Initiator
            <hint-tooltip>
              {{ stateChannelsHints.initiator }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
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
            Responder
            <hint-tooltip>
              {{ stateChannelsHints.responder }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
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
            On-Chain TXs
            <hint-tooltip>
              {{ stateChannelsHints.onChainUpdates }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatNumber(stateChannelDetails.onChainUpdates) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Last Known Round
            <hint-tooltip>
              {{ stateChannelsHints.lastKnownRound }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatNumber(stateChannelDetails.lastKnownRound) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Locked
            <hint-tooltip>
              {{ stateChannelsHints.locked }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatAePrice(stateChannelDetails.aeLocked, null) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Last Updated Height
            <!--            todo fix hint-->
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
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
            Last Updated
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
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
            Last TX Type
            <hint-tooltip>
              {{ stateChannelsHints.lastTxType }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            {{ stateChannelDetails.lastTxType }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            API Links
            <hint-tooltip>
              {{ stateChannelsHints.apiLinks }}
            </hint-tooltip>
          </th>
          <td class="state-channel-details-panel__data">
            <div class="state-channel-details-panel__container">
              <app-link
                :to="stateChannelMiddlewareUrl"
                class="state-channel-details-panel__link">
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
import { formatAePrice } from '@/utils/format'
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

const stateChannelMiddlewareUrl = `${MIDDLEWARE_URL}/v2/channels/${props.stateChannelDetails.id}`
</script>

<style scoped>
.state-channel-details-panel {
  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: right;
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
