<template>
  <div class="account-names-table-condensed">
    <table
      v-for="name in accountNames?.data"
      :key="name.name"
      class="account-names-table-condensed__table">
      <tbody>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            Name
          </th>
          <td class="account-names-table-condensed__data">
            <app-link
              :to="`/names/${name.name}`"
              class="account-names-table-condensed__name u-ellipsis">
              {{ name.name }}
            </app-link>
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            Expiration Height
          </th>
          <td class="account-names-table-condensed__data">
            {{ name.expirationHeight }}
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            Expires In
          </th>
          <td class="account-names-table-condensed__data">
            <div>
              {{ name.expirationHeight }}
            </div>
            <datetime-label :datetime="name.expires"/>
          </td>
        </tr>
        <tr class="account-names-table-condensed__row">
          <th class="account-names-table-condensed__header">
            Points To
          </th>
          <td class="account-names-table-condensed__data">
            <template v-if="name.pointers.length">
              <value-hash-ellipsed
                v-for="pointer in name.pointers"
                :key="pointer"
                class="account-names-table-condensed__pointer"
                :hash="pointer"
                :link-to="`/accounts/${pointer}`"/>
            </template>
            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'AccountNamesTableCondensed',
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
.account-names-table-condensed {
  &__table {
    background: var(--color-white);
    padding: var(--space-4);
    margin-bottom: var(--space-6);
  }

  &:last-of-type {
    margin-bottom: var(--space-5);
  }

  &__name {
    display: inline-block;
    max-width: 160px;
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
    font-family: var(--font-monospaced);
  }

  &__pointer {
    display: block;
  }
}
</style>
