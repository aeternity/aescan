<template>
  <app-panel>
    <table v-if="tokenEvents">
      <tr>
        <th>Hash</th>
        <th>Name</th>
        <th>Dates</th>
        <th>Arguments</th>
        <th>Data</th>
      </tr>
      <tr
        v-for="event in tokenEvents.data"
        :key="event.block_hash">
        <td>
          <hash-symbol>th</hash-symbol>
          {{ event.tx }}
          <value-hash-ellipsed
            :hash="event.payload.hash"
            :link-to="`/transactions/${event.payload.hash}`"/>
        </td>
        <td>
          NAME
        </td>
        <td>
          {{ event.payload.micro_time }}
        </td>
        <td>
          {{ event.payload.tx.args }}
        </td>
        <td>
          {{ event.payload.tx.call_data }}
        </td>
      </tr>
    </table>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import { useTokenDetailsStore } from '~/stores/tokenDetails'

export default {
  name: 'TokenEventsPanel',
  computed: {
    ...mapState(useTokenDetailsStore, ['tokenEvents']),
  },
}
</script>
