<template>
  <table>
    <thead>
      <tr>
        <th>
          Name
          <hint-tooltip>
            {{ accountHints.name }}
          </hint-tooltip>
        </th>
        <th>
          Expires
          <hint-tooltip>
            {{ accountHints.expires }}
          </hint-tooltip>
        </th>
        <th>
          Points To
          <hint-tooltip>
            {{ accountHints.pointsTo }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in accountNames.data"
        :key="name.name">
        <td>
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td>
          <block-time-cell
            :height="name.expirationHeight"
            :datetime="name.expiration"/>
        </td>
        <td>
          <value-hash-ellipsed
            v-for="pointer in name.pointers"
            :key="pointer"
            class="account-names-table__pointer"
            :hash="pointer"
            :link-to="`/accounts/${pointer}`"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import AppLink from '@/components/AppLink'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { accountHints } from '@/utils/hints/accountHints'
import HintTooltip from '@/components/HintTooltip'

defineProps({
  accountNames: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-names-table {
  &__pointer {
    display: block;
  }
}
</style>
