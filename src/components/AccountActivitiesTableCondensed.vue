<template>
  <div class="account-activities-table-condensed">
    <table
      v-for="(activity, index) in accountActivities?.data"
      :key="index"
      class="account-activities-table-condensed__table">
      <tbody>
        <tr class="account-activities-table-condensed__row">
          <th class="account-activities-table-condensed__header">
            <app-tooltip>
              Hash
              <template #tooltip>
                {{ accountHints.activityHash }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-activities-table-condensed__data">
            <value-hash-ellipsed
              v-if="activity.hash"
              :hash="activity.hash"
              :link-to="`/transactions/${activity.hash}`"/>
            <template v-else>
              N/A
            </template>
          </td>
        </tr>
        <tr class="account-activities-table-condensed__row">
          <th class="account-activities-table-condensed__header">
            <app-tooltip>
              <time-toggle-button/>
              <template #tooltip>
                {{ accountHints.activityTime }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-activities-table-condensed__data">
            <block-time-cell
              :height="activity.height"
              :timestamp="activity.time"/>
          </td>
        </tr>
        <tr class="account-activities-table-condensed__row">
          <th class="account-activities-table-condensed__header">
            <app-tooltip>
              Type
              <template #tooltip>
                {{ accountHints.activityType }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-activities-table-condensed__data">
            <account-activity-type-cell
              :account-details="accountDetails"
              :activity="activity"/>
          </td>
        </tr>
        <tr class="account-activities-table-condensed__row">
          <th class="account-activities-table-condensed__header">
            <app-tooltip>
              Activity
              <template #tooltip>
                {{ accountHints.activityMeaning }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-activities-table-condensed__data">
            <account-activity-cell
              :account-details="accountDetails"
              :activity="activity"/>
          </td>
        </tr>
        <tr class="account-activities-table-condensed__row">
          <th class="account-activities-table-condensed__header">
            <app-tooltip>
              Data
              <template #tooltip>
                {{ accountHints.activityData }}
              </template>
            </app-tooltip>
          </th>
          <td class="account-activities-table-condensed__data">
            <account-activity-data-cell
              :account-details="accountDetails"
              :activity="activity"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import AccountActivityCell from '@/components/AccountActivityCell'
import AccountActivityTypeCell from '@/components/AccountActivityTypeCell'
import AccountActivityDataCell from '@/components/AccountActivityDataCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { accountHints } from '@/utils/hints/accountHints'
import AppTooltip from '@/components/AppTooltip'

defineProps({
  accountDetails: {
    type: Object,
    required: true,
  },
  accountActivities: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.account-activities-table-condensed {
  padding: var(--space-4) 0 0;

  &__table {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: var(--space-1);
    }

    @media (--desktop) {
      padding: var(--space-4);
    }
  }

  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__header {
    border-bottom: 0;
  }

  &__data {
    text-align: right;
  }
}
</style>
