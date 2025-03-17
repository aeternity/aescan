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
            <!--            todo remove-->
            <app-link
              v-if="name.specialPointers.account"
              :to="`/accounts/${name.specialPointers.account}`">
              <span class="u-hidden-mobile">
                {{ name.specialPointers.account }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.account) }}
              </span>
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
              <span class="u-hidden-mobile">
                {{ name.specialPointers.channel }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.channel) }}
              </span>
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
              <span class="u-hidden-mobile">
                {{ name.specialPointers.contract }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.contract) }}
              </span>
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
              <span class="u-hidden-mobile">
                {{ name.specialPointers.oracle }}
              </span>
              <span class="u-hidden-desktop">
                {{ formatEllipseHash(name.specialPointers.oracle) }}
              </span>
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
