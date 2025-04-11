<template>
  <app-panel class="mining-pools-panel">
    <table>
      <thead>
        <tr>
          <th>
            Name
            <hint-tooltip>
              {{ miningHints.miningPoolName }}
            </hint-tooltip>
          </th>
          <th>
            Pool Url
            <hint-tooltip>
              {{ miningHints.miningPoolUrl }}
            </hint-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pool in MINING_POOLS"
          :key="pool.name">
          <td>
            {{ pool.name }}
          </td>
          <td>
            <app-link :to="pool.url">
              {{ pool.url }}
            </app-link>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>
import { miningHints } from '@/utils/hints/miningHints'
import { MINING_POOLS } from '@/utils/constants'
</script>
