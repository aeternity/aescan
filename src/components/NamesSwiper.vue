<template>
  <app-swiper :slides="recentlyActivatedNames">
    <template #slide="{ slideData: name }">
      <table>
        <tbody>
          <tr>
            <th class="names-swiper__header">
              <app-tooltip>
                Name
                <template #tooltip>
                  {{ namesHints.name }}
                </template>
              </app-tooltip>
            </th>
            <td class="names-swiper__data">
              <app-link
                :to="`/names/${name.name}`"
                class="names-swiper__name u-ellipsis">
                {{ name.name }}
              </app-link>
            </td>
          </tr>
          <tr>
            <th class="names-swiper__header">
              <app-tooltip>
                Claimed by
                <template #tooltip>
                  {{ namesHints.owner }}
                </template>
              </app-tooltip>
            </th>
            <td class="names-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${name.address}`"
                :hash="name.address"/>
            </td>
          </tr>
          <tr>
            <th class="names-swiper__header">
              <app-tooltip>
                Price
                <template #tooltip>
                  {{ namesHints.activationPrice }}
                </template>
              </app-tooltip>
            </th>
            <td class="names-swiper__data">
              {{ formatAePrice(name.price) }}
            </td>
          </tr>
          <tr>
            <th>
              <app-tooltip>
                Activated
                <template #tooltip>
                  {{ namesHints.activationTime }}
                </template>
              </app-tooltip>
            </th>
            <td class="names-swiper__data">
              {{ name.activatedHeight }} -
              <datetime-label :datetime="name.activated"/>
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
import { formatAePrice } from '@/utils/format'
import { namesHints } from '@/utils/hints/namesHints'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

const { recentlyActivatedNames } = storeToRefs(useNamesStore())
</script>

<style scoped>
.names-swiper {
  &__header {
    border-bottom: 1px solid var(--color-midnight-15);
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
