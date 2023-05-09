<template>
  <table>
    <tr>
      <th>State Channel ID</th>
      <th>Status</th>
      <th>Participants</th>
      <th>On-Chain Updates</th>
      <th>Locked</th>
      <th>Last Known Round</th>
      <th>Last Updated</th>
        <th>Last TX type</th>
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
      <td>{{ channel.updateCount }}</td>
      <td>{{ channel.locked }}</td>
      <td>{{ channel.lastRound }}</td>
      <td>
        <div>
          {{ channel.updatedHeight }}
        </div>
        <div>
          <datetime-label :datetime="channel.updated "/>
        </div>
      </td>
      <td>{{ channel.updateType }}</td>
    </tr>
  </table>
</template>
<script setup>
defineProps({
  stateChannels: {
    type: Object,
    required: true,
  },
})
</script>
