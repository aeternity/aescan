<template>
  <table class="account-activities-table">
    <thead>
      <tr>
        <th>
          Hash
          <hint-tooltip>
            {{ accountHints.activityHash }}
          </hint-tooltip>
        </th>
        <th>
          <time-toggle-button/>
          <hint-tooltip>
            {{ accountHints.activityTime }}
          </hint-tooltip>
        </th>
        <th>
          Type
          <hint-tooltip>
            {{ accountHints.activityType }}
          </hint-tooltip>
        </th>
        <th>
          Activity
          <hint-tooltip>
            {{ accountHints.activityMeaning }}
          </hint-tooltip>
        </th>
        <th>
          Data
          <hint-tooltip>
            {{ accountHints.activityData }}
          </hint-tooltip>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(activity, index) in accountActivities?.data"
        :key="index">
        <td class="account-activities-table__data">
          <value-hash-ellipsed
            v-if="activity.hash"
            :hash="activity.hash"
            :link-to="`/transactions/${activity.hash}`"/>
          <template v-else>
            N/A
          </template>
        </td>
        <td class="account-activities-table__data">
          <block-time-cell
            :height="activity.height"
            :timestamp="activity.time"/>
        </td>
        <td class="account-activities-table__data">
          <account-activity-type-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
        <td class="account-activities-table__data">
          <account-activity-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
        <td class="account-activities-table__data">
          <account-activity-data-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { accountHints } from '@/utils/hints/accountHints'

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
.account-activities-table__data {
  white-space: nowrap;
}
</style>
