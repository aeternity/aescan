<template>
  <app-panel v-if="stateChannels">
    <table>
      <tr>
        <th>State Channel ID</th>
        <th>Status</th>
        <th>Participants</th>
        <th>On-Chain Updates</th>
        <th>Locked</th>
        <th>Last Known Round</th>
        <th>Last Updated</th>
        <th>Last TX Type</th>
      </tr>
      <tr
        v-for="channel in stateChannels.data"
        :key="channel.id">
        <td>
          <value-hash-ellipsed
            :hash="channel.id"
            :link-to="`/accounts/${channel.id}`"/>
        </td>
        <td>{{ channel.status }}</td>
        <td>
          <div>
            Initiator:
            <value-hash-ellipsed
              :hash="channel.initiator"
              :link-to="`/accounts/${channel.initiator}`"/>
          </div>
          <div>
            Responder:
            <value-hash-ellipsed
              :hash="channel.responder"
              :link-to="`/accounts/${channel.responder}`"/>
          </div>
        </td>
        <td>{{ channel.updates }}</td>
        <td>
          {{ channel.locked }}
        </td>
        <td>{{ channel.lastRound }}</td>
        <td>{{ channel.lastUpdatesTime }}{{ channel.lastUpdatesHeight }}</td>
        <td>{{ channel.lastUpdate }}</td>
      </tr>
    </table>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStateChannelsStore } from '~/stores/stateChannels2'

const stateChannelsStore = useStateChannelsStore()
const { stateChannels } = storeToRefs(stateChannelsStore)
const { fetchStateChannels } = stateChannelsStore

const loadStateChannels = () => {
  fetchStateChannels()
}

if (process.client) {
  loadStateChannels()
}
// todo solve naming
</script>
