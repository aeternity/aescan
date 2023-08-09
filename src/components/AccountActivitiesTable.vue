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
          Time
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
          <div>
            <app-link
              :to="`/keyblocks/${activity.height}`">
              {{ activity.height }}
            </app-link>
          </div>
          <datetime-label :datetime="activity.time"/>
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
          <transaction-cell
            v-if="activity.payload.tx"
            :transaction-type="activity.payload.tx.type"
            :transaction-data="activity.payload.tx"/>
          <internal-transfer-cell
            v-else-if="activity.type==='InternalTransferEvent'"
            :activity="activity"/>
          <template v-else>
            N/A
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AccountActivityCell from '@/components/AccountActivityCell'
import AccountActivityTypeCell from '@/components/AccountActivityTypeCell'
import InternalTransferCell from '@/components/InternalTransferCell'
import DatetimeLabel from '@/components/DatetimeLabel'
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
