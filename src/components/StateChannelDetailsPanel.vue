<template>
  <app-panel class="state-channel-details-panel">
    <header class="state-channel-details-panel__header">
      <h3 class="state-channel-details-panel__heading">
        DETAILS
      </h3>
      <div class="state-channel-details-panel__container">
        <copy-chip
          :label="stateChannelDetails.id"
          class="state-channel-details-panel__chip"/>
        <copy-chip
          :label="formatEllipseHash(stateChannelDetails.id)"
          :clipboard-text="stateChannelDetails.id"
          class="state-channel-details-panel__chip-ellipse"/>
      </div>
    </header>
    <table>
      <tbody>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Status
          </th>
          <td class="state-channel-details-panel__data">
            <AppChip :variant="stateChannelDetails.isOpen ? 'success' : 'primary'">
              {{ stateChannelDetails.isOpen ? 'Open' : 'Closed' }}
            </AppChip>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Create transaction
          </th>
          <td class="state-channel-details-panel__data">
            <app-link :to="`/transactions/${stateChannelDetails.createTransactionHash}`">
              <span class="state-channel-details-panel__hash">
                {{ stateChannelDetails.createTransactionHash }}
              </span>
              <span class="state-channel-details-panel__hash-ellipse">
                {{ formatEllipseHash(stateChannelDetails.createTransactionHash) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr
          class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Initial amount
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatAePrice(stateChannelDetails.initialAmount, null) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Initiator
          </th>
          <td class="state-channel-details-panel__data">
            <app-link :to="`/accounts/${stateChannelDetails.initiator}`">
              <span class="state-channel-details-panel__hash">
                {{ stateChannelDetails.initiator }}
              </span>
              <span class="state-channel-details-panel__hash-ellipse">
                {{ formatEllipseHash(stateChannelDetails.initiator) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Responder
          </th>
          <td class="state-channel-details-panel__data">
            <app-link :to="`/accounts/${stateChannelDetails.responder}`">
              <span class="state-channel-details-panel__hash">
                {{ stateChannelDetails.responder }}
              </span>
              <span class="state-channel-details-panel__hash-ellipse">
                {{ formatEllipseHash(stateChannelDetails.responder) }}
              </span>
            </app-link>
          </td>
        </tr>
        <tr
          class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            On-chain updates
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatNumber(stateChannelDetails.onChainUpdates) }}
          </td>
        </tr>
        <tr
          class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Last known round
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatNumber(stateChannelDetails.lastKnownRound) }}
          </td>
        </tr>
        <tr
          class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            AE locked
          </th>
          <td class="state-channel-details-panel__data">
            {{ formatAePrice(stateChannelDetails.aeLocked, null) }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Last updated
          </th>
          <td class="state-channel-details-panel__data">
            <template v-if="stateChannelDetails.lastUpdated">
              {{ stateChannelDetails.lastUpdatedHeight }} -
              <datetime-label :datetime="stateChannelDetails.lastUpdated"/>
            </template>
            <template v-else>
              ---
            </template>
          </td>
        </tr>
        <tr
          class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            Last TX Type
          </th>
          <td class="state-channel-details-panel__data">
            {{ stateChannelDetails.lastTxType }}
          </td>
        </tr>
        <tr class="state-channel-details-panel__row">
          <th class="state-channel-details-panel__table-header">
            API links
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
import AppLink from '@/components/AppLink'
import AppChip from '@/components/AppChip'
import AppPanel from '@/components/AppPanel'
import CopyChip from '@/components/CopyChip'
import DatetimeLabel from '@/components/DatetimeLabel'

const { MIDDLEWARE_URL } = useRuntimeConfig().public

const props = defineProps({
  stateChannelDetails: {
    type: [Object, null],
    default: null,
  },
})

const stateChannelMiddlewareUrl = `${MIDDLEWARE_URL}/v2/channels/${props.stateChannelDetails.id}`
</script>

<style scoped>
.state-channel-details-panel {
  padding: var(--space-4) var(--space-1) var(--space-2);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-2);
  }

  &__heading {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: 0;
    }
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

  &__container {
    display: inline-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-1);
    margin-bottom: var(--space-1);

    @media (--desktop) {
      justify-content: flex-end;
      margin-bottom: 0;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__data {
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
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

  &__link {
    display: inline-flex;
    align-items: center;
  }
}
</style>
