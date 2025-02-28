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
          <td class="state-channel-details-panel__data">
            <copy-chip :label="stateChannelDetails.id"/>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.status }}
            </hint-tooltip>
            Status
          </th>
          <td class="state-channel-details-panel__data">
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
          <td class="state-channel-details-panel__data">
            <app-link :to="`/transactions/${stateChannelDetails.createTransactionHash}`">
              {{ stateChannelDetails.createTransactionHash }}
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
          <td class="state-channel-details-panel__data">
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
          <td class="state-channel-details-panel__data">
            <app-link :to="`/accounts/${stateChannelDetails.initiator}`">
              {{ stateChannelDetails.initiator }}
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
          <td class="state-channel-details-panel__data">
            <app-link :to="`/accounts/${stateChannelDetails.responder}`">
              {{ stateChannelDetails.responder }}
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
          <td class="state-channel-details-panel__data">
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
          <td class="state-channel-details-panel__data">
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
          <td class="state-channel-details-panel__data">
            <price-label :price="stateChannelDetails.aeLocked"/>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdatedHeight }}
            </hint-tooltip>
            Last Update Height
          </th>
          <td class="state-channel-details-panel__data">
            <app-link
              v-if="stateChannelDetails.lastUpdatedHeight"
              :to="`/keyblocks/${stateChannelDetails.lastUpdatedHeight}`">
              {{ stateChannelDetails.lastUpdatedHeight }}
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdated }}
            </hint-tooltip>
            Last Update
          </th>
          <td class="state-channel-details-panel__data">
            <timestamp-label
              v-if="stateChannelDetails.lastUpdated"
              :timestamp="stateChannelDetails.lastUpdated"
              :is-extended="true"/>
            <template v-else>
              N/A
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
          <td class="state-channel-details-panel__data">
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
          <td class="state-channel-details-panel__data">
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

const { MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  stateChannelDetails: {
    type: Object,
    required: true,
  },
})

const stateChannelMiddlewareUrl = `${MIDDLEWARE_URL}/channels/${props.stateChannelDetails.id}`
</script>

<style scoped>
.state-channel-details-panel {
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
    white-space: wrap;
    word-break: break-all;
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
