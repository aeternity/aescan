<template>
  <span>
    <span class="value-hash-ellipsed">
      <app-link
        v-if="linkTo"
        :to="linkTo">
        {{ formatEllipseHash(hash) }}
      </app-link>
      <app-tooltip v-else>
        {{ formatEllipseHash(hash) }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>

    <span class="value-hash-ellipsed--desktop">
      <app-tooltip v-if="linkTo">
        <app-link :to="linkTo">
          {{ formatEllipseHash(hash) }}
        </app-link>
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
      <app-tooltip v-else>
        {{ formatEllipseHash(hash) }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>
  </span>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'
import { formatEllipseHash } from '@/utils/format'
import AppLink from '@/components/AppLink'

export default {
  name: 'ValueHashEllipsed',
  components: { AppLink, AppTooltip },
  props: {
    hash: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      default: null,
    },
  },
  methods: {
    formatEllipseHash,
  },
}
</script>

<style scoped>
.value-hash-ellipsed {
  display: inline-flex;
  @media (--desktop) {
    display: none;
  }

  &--desktop {
    display: none;
    @media (--desktop) {
      display: inline-flex;
    }
  }
}
</style>
