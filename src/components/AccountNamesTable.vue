<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Expires</th>
        <th>Points To</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="name in accountNames?.data"
        :key="name.name">
        <td>
          <app-link :to="`/names/${name.name}`">
            {{ name.name }}
          </app-link>
        </td>
        <td>
          <div>
            {{ name.expirationHeight }}
          </div>
          <datetime-label :datetime="name.expires"/>
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
import DatetimeLabel from '@/components/DatetimeLabel'

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
