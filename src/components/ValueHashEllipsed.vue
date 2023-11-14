<template>
  <span>
    <span class="value-hash-ellipsed">
      <app-link
        v-if="linkTo"
        :to="linkTo">
        {{ translatedAddress }}
      </app-link>
      <app-tooltip v-else>
        {{ translatedAddress }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>

    <span class="value-hash-ellipsed--desktop">
      <app-tooltip v-if="linkTo">
        <app-link :to="linkTo">
          {{ translatedAddress }}
        </app-link>
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
      <app-tooltip v-else>
        {{ translatedAddress }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>
  </span>
</template>

<script setup>
import { formatEllipseHash } from '@/utils/format'

const props = defineProps({
  hash: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    default: null,
  },
})

const translatedAddress = computed(() => {
  if (KNOWN_ADDRESSES.some(address => address.hash === props.hash)) {
    return KNOWN_ADDRESSES.find(address => address.hash === props.hash).name
  } else {
    return formatEllipseHash(props.hash)
  }
})
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
