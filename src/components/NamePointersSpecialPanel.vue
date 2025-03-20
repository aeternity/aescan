<template>
  <app-panel class="name-pointers-special-panel">
    <template #title>
      SPECIAL POINTERS
    </template>
    <table>
      <tbody>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints.accountPointer }}
            </hint-tooltip>
            Account
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.account"
              :to="`/accounts/${name.specialPointers.account}`">
              {{ name.specialPointers.account }}
            </app-link>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints.channelPointer }}
            </hint-tooltip>
            State Channel
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.channel"
              :to="`/state-channels/${name.specialPointers.channel}`">
              {{ name.specialPointers.channel }}
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints.contractPointer }}
            </hint-tooltip>
            Smart Contract
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.contract"
              :to="`/contracts/${name.specialPointers.contract}`">
              {{ name.specialPointers.contract }}
            </app-link>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr>
          <th>
            <hint-tooltip>
              {{ namesHints.oraclePointer }}
            </hint-tooltip>
            Oracle
          </th>
          <td>
            <app-link
              v-if="name.specialPointers.oracle"
              :to="`/oracles/${name.specialPointers.oracle}`">
              {{ name.specialPointers.oracle }}
            </app-link>
            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

const { name } = storeToRefs(useNameDetailsStore())
</script>

<style scoped>
@import url("../assets/styles/utilities/panel-detail.css");
</style>
