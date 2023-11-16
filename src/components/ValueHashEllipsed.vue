<template>
  <span>
    <span class="value-hash-ellipsed">
      <app-link
        v-if="linkTo"
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

    <span class="value-hash-ellipsed--desktop">
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
