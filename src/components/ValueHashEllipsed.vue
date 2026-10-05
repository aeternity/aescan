<template>
  <span>
    <span class="u-hidden-desktop">
      <app-link
        v-if="linkTo"
        class="value-hash-ellipsed__link"
        :to="linkTo">
        {{ formatKnownAddress(hash) }}
      </app-link>
      <app-tooltip v-else>
        {{ formatKnownAddress(hash) }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>

    <span class="u-hidden-mobile">
      <app-tooltip v-if="linkTo">
        <app-link :to="linkTo">
          {{ formatKnownAddress(hash) }}
        </app-link>
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
      <app-tooltip v-else>
        {{ formatKnownAddress(hash) }}
        <template #tooltip>
          {{ hash }}
        </template>
      </app-tooltip>
    </span>
  </span>
</template>

<script setup>
defineProps({
  hash: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    default: null,
  },
})
</script>

<style scoped>
/* Hashes and addresses are alphanumeric data — always monospace */
span {
  font-family: var(--font-monospaced);
}
</style>
