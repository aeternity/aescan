<template>
  <app-tooltip v-if="diffLabel">
    <app-link
      v-if="!isFuture"
      :to="`/keyblocks/${height}`">
      {{ height }}
    </app-link>
    <span
      v-else
      class="block-height-link__future">
      {{ height }}
    </span>
    <template #tooltip>
      <div class="block-height-link__tooltip">
        <div>{{ relativeTime }}</div>
        <div
          :class="[
            'block-height-link__diff',
            {
              'block-height-link__diff--up': diff > 0,
              'block-height-link__diff--down': diff < 0,
            },
          ]">
          {{ diffLabel }}
        </div>
      </div>
    </template>
  </app-tooltip>
  <app-link
    v-else
    :to="`/keyblocks/${height}`">
    {{ height }}
  </app-link>
</template>

<script setup>
import { DateTime } from 'luxon'
import { MINUTES_PER_BLOCK } from '@/utils/constants'

const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
})

const { blockHeight } = storeToRefs(useRecentBlocksStore())

const diff = computed(() => {
  return blockHeight.value === null ? null : props.height - blockHeight.value
})

// Blocks that were not mined yet have no keyblock page to link to
const isFuture = computed(() => diff.value > 0)

const diffLabel = computed(() => {
  if (diff.value === null) {
    return null
  }
  if (diff.value === 0) {
    return 'Current block'
  }
  return `${diff.value > 0 ? '+' : '-'}${formatNumber(Math.abs(diff.value))} blocks`
})

const relativeTime = computed(() => {
  if (diff.value === 0) {
    return 'now'
  }
  const estimate = DateTime.now().plus({ minutes: diff.value * MINUTES_PER_BLOCK }).toRelative()
  return `≈ ${estimate}`
})
</script>

<style scoped>
.block-height-link {
  &__future {
    font-family: var(--font-monospaced);
  }

  &__tooltip {
    white-space: nowrap;
  }

  &__diff {
    font-family: var(--font-monospaced);
    color: var(--text-dim);

    &--up {
      color: var(--up);
    }

    &--down {
      color: var(--down);
    }
  }
}
</style>
