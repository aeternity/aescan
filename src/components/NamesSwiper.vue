<template>
  <app-swiper :slides="recentlyActivatedNames">
    <template #slide="{ slideData: name }">
      <table>
        <tbody>
          <tr>
            <th class="names-swiper__header">
              Name
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
              Claimed by
            </th>
            <td class="names-swiper__data">
              <value-hash-ellipsed
                :link-to="`/accounts/${name.address}`"
                :hash="name.address"/>
            </td>
          </tr>
          <tr>
            <th class="names-swiper__header">
              Price
            </th>
            <td class="names-swiper__data">
              {{ formatAePrice(name.price) }}
            </td>
          </tr>
          <tr>
            <th>
              Activated
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
<script>
import { mapState } from 'pinia'
import AppLink from '@/components/AppLink'
import { useNamesStore } from '@/stores/names'
import { formatAePrice } from '@/utils/format'
import AppSwiper from '@/components/AppSwiper'
import ValueHashEllipsed from '@/components/ValueHashEllipsed'
import DatetimeLabel from '@/components/DatetimeLabel'

export default {
  name: 'NamesSwiper',
  components: { DatetimeLabel, ValueHashEllipsed, AppSwiper, AppLink },
  computed: {
    ...mapState(useNamesStore, ['recentlyActivatedNames']),
  },
  methods: {
    formatAePrice,
  },
}
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
