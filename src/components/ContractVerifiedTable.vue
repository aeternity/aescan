<template>
  <table class="contract-verified-table">
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractVerifiedHints.license }}
          </hint-tooltip>
          License
        </th>
        <td>
          {{ verificationDetails.license }}
        </td>
      </tr>

      <tr>
        <th>
          <hint-tooltip>
            {{ contractVerifiedHints.compiler }}
          </hint-tooltip>
          Compiler Version
        </th>
        <td>
          {{ verificationDetails.compiler }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractVerifiedHints.entryFile }}
          </hint-tooltip>
          Entry File
        </th>
        <td>
          {{ verificationDetails.entryFile }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractVerifiedHints.verifiedAt }}
          </hint-tooltip>
          <time-toggle-button>Verified</time-toggle-button>
        </th>
        <td>
          <timestamp-label :timestamp="verificationDetails.verifiedAt"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ contractVerifiedHints.initCallParameters }}
          </hint-tooltip>
          Entrypoint
        </th>
        <td>
          {{ verificationDetails.initCallParameters }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { contractVerifiedHints } from '@/utils/hints/contractVerifiedHints'

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
@import url("../assets/styles/utilities/panel-detail.css");
</style>
