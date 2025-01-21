<template>
  <app-swiper :slides="recentlyActivatedNames">
    <template #slide="{ slideData: name }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-names-swiper__header">
              <hint-tooltip>
                {{ namesHints.nameId }}
              </hint-tooltip>
              Name
            </th>
            <td class="dashboard-names-swiper__data">
              <app-link
                :to="`/names/${name.name}`"
                class="dashboard-names-swiper__name u-ellipsis">
                {{ name.name }}
              </app-link>
            </td>
          </tr>
          <tr>
            <th class="dashboard-names-swiper__header">
              <hint-tooltip>
                {{ namesHints.owner }}
              </hint-tooltip>

              Claimed by
            </th>
            <td class="dashboard-names-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${name.address}`"
                :hash="name.address"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-names-swiper__header">
              <hint-tooltip>
                {{ namesHints.activationPrice }}
              </hint-tooltip>
              Price
            </th>
            <td class="dashboard-names-swiper__data">
              <price-label :price="name.price"/>
            </td>
          </tr>
          <tr>
            <th>
              <hint-tooltip>
                {{ namesHints.activationTime }}
              </hint-tooltip>
              <time-toggle-button class="dashboard-names-swiper__button">
                Activated
              </time-toggle-button>
            </th>
            <td class="dashboard-names-swiper__data">
              <app-link
                :to="`/keyblocks/${name.activatedHeight}`">
                {{ name.activatedHeight }}
              </app-link>
              -
              <timestamp-label :timestamp="name.activated"/>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </app-swiper>
</template>
<script setup>
import { storeToRefs } from 'pinia'

import { useNamesStore } from '@/stores/names'
import { namesHints } from '@/utils/hints/namesHints'

const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.dashboard-names-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-25);
  }

  &__data {
    text-align: right;
  }

  &__name {
    max-width: 200px;
    display: inline-block;
  }

  &__button {
    margin-left: 3px;
  }
}
</style>
