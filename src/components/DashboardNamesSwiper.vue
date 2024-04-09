<template>
  <app-swiper :slides="recentlyActivatedNames">
    <template #slide="{ slideData: name }">
      <table>
        <tbody>
          <tr>
            <th class="dashboard-names-swiper__header">
              <app-tooltip>
                Name
                <template #tooltip>
                  {{ namesHints.name }}
                </template>
              </app-tooltip>
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
              <app-tooltip>
                Claimed by
                <template #tooltip>
                  {{ namesHints.owner }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-names-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${name.address}`"
                :hash="name.address"/>
            </td>
          </tr>
          <tr>
            <th class="dashboard-names-swiper__header">
              <app-tooltip>
                Price
                <template #tooltip>
                  {{ namesHints.activationPrice }}
                </template>
              </app-tooltip>
            </th>
            <td class="dashboard-names-swiper__data">
              {{ formatNullable(formatAePrice(name.price)) }}
            </td>
          </tr>
          <tr>
            <th>
              <app-tooltip>
                <time-switch-button>Activated</time-switch-button>
                <template #tooltip>
                  {{ namesHints.activationTime }}
                </template>
              </app-tooltip>
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
import AppLink from '@/components/AppLink'
import { useNamesStore } from '@/stores/names'
import { formatAePrice, formatNullable } from '@/utils/format'
import { namesHints } from '@/utils/hints/namesHints'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'

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
}
</style>
