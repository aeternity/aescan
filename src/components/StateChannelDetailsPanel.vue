<template>
  <app-panel class="state-channel-details-panel">
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.stateChannelId }}
            </hint-tooltip>
            State Channel ID
          </th>
          <td>
            <copy-chip :label="stateChannelDetails.id"/>
          </td>
        </tr>
        <tr>
          <th>
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
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.createTransaction }}
            </hint-tooltip>
            Create Transaction
          </th>
          <td>
            <app-link :to="`/transactions/${stateChannelDetails.createTransactionHash}`">
              {{ stateChannelDetails.createTransactionHash }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.initialAmount }}
            </hint-tooltip>
            Initial Amount
          </th>
          <td>
            <price-label
              :price="stateChannelDetails.initialAmount"
              is-raw/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.initiator }}
            </hint-tooltip>
            Initiator
          </th>
          <td>
            <app-link :to="`/accounts/${stateChannelDetails.initiator}`">
              {{ stateChannelDetails.initiator }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.responder }}
            </hint-tooltip>
            Responder
          </th>
          <td>
            <app-link :to="`/accounts/${stateChannelDetails.responder}`">
              {{ stateChannelDetails.responder }}
            </app-link>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.onChainUpdates }}
            </hint-tooltip>
            On-Chain TXs
          </th>
          <td>
            <number-label :number="stateChannelDetails.onChainUpdates"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.lastKnownRound }}
            </hint-tooltip>
            Last Known Round
          </th>
          <td>
            <number-label :number="stateChannelDetails.lastKnownRound"/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.locked }}
            </hint-tooltip>
            Locked
          </th>
          <td>
            <price-label
              :price="stateChannelDetails.aeLocked"
              is-raw/>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdateHeight }}
            </hint-tooltip>
            Last Update Height
          </th>
          <td>
            <app-link
              v-if="stateChannelDetails.lastUpdatedHeight"
              :to="`/keyblocks/${stateChannelDetails.lastUpdatedHeight}`">
              {{ stateChannelDetails.lastUpdateHeight }}
            </app-link>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.lastUpdate }}
            </hint-tooltip>
            Last Update
          </th>
          <td>
            <timestamp-label
              v-if="stateChannelDetails.lastUpdated"
              :timestamp="stateChannelDetails.lastUpdated"
              :is-extended="true"/>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ stateChannelsHints.lastTxType }}
            </hint-tooltip>
            Last TX Type
          </th>
          <td>
            {{ stateChannelDetails.lastTxType }}
          </td>
        </tr>
        <tr>
          <th>
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
@import url("../assets/styles/utilities/_detail-table.css");

.state-channel-details-panel {
  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
