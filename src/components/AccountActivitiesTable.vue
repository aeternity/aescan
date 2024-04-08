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
          <time-switch-button/>
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
        <td>
          <value-hash-ellipsed
            v-if="activity.hash"
            :hash="activity.hash"
            :link-to="`/transactions/${activity.hash}`"/>
          <template v-else>
            N/A
          </template>
        </td>
        <td>
          <block-time-cell
            :height="activity.height"
            :datetime="activity.time"/>
        </td>
        <td>
          <account-activity-type-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
        <td>
          <account-activity-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
        <td>
          <account-activity-data-cell
            :account-details="accountDetails"
            :activity="activity"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AccountActivityCell from '@/components/AccountActivityCell'
import AccountActivityTypeCell from '@/components/AccountActivityTypeCell'
import AccountActivityDataCell from '@/components/AccountActivityDataCell'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import { accountHints } from '@/utils/hints/accountHints'
import HintTooltip from '@/components/HintTooltip'

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
