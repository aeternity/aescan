<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Expiration Height</th>
        <th>Expires In</th>
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
        <td>{{ name.expirationHeight }}</td>
        <td>
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
<script>
import AppLink from '@/components/AppLink'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'AccountNamesTable',
  components: { DatetimeLabel, AppLink, ValueHashEllipsed },
  props: {
    accountNames: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.account-names-table {
  &__pointer {
    display: block;
  }
}
</style>
