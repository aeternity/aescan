<template>
  <div class="keyblock-sequence">
    <div
      ref="keyblocksSequence"
      class="keyblock-sequence__sequence">
      <TransitionGroup
        name="keyblock-sequence"
        tag="div"
        class="keyblock-sequence__items">
        <div
          v-for="keyblock in keyblocks"
          :key="keyblock.hash"
          :class="[
            'keyblock-sequence__cell',
            {
              'keyblock-sequence__cell--empty': keyblock?.microBlocksCount === 0,
              'keyblock-sequence__cell--active': keyblock.hash === selectedKeyblock.hash,
            }]"
          @click="selectKeyblock(keyblock)">
          <app-tooltip>
            {{ keyblock?.microBlocksCount }}
            <template #tooltip>
              <div class="keyblock-sequence__tooltip">
                <div>Height: {{ keyblock?.height }}</div>
                <div v-if="keyblock?.time">
                  {{ formatTime(keyblock.time) }}
                </div>
              </div>
            </template>
          </app-tooltip>
        </div>
      </TransitionGroup>
      <div
        v-if="isLoadingMoreKeyblocks"
        class="keyblock-sequence__placeholders">
        <div
          v-for="i in PLACEHOLDER_COUNT"
          :key="`ph-${i}`"
          class="keyblock-sequence__cell keyblock-sequence__cell--placeholder"/>
      </div>
    </div>
    <div class="keyblock-sequence__overlay"/>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'

function formatTime(ms) {
  return DateTime.fromMillis(ms).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
}

const { selectKeyblock } = useRecentBlocksStore()
const {
  selectedKeyblock,
  isFirstKeyblockSelected,
  isLoadingMoreKeyblocks,
} = storeToRefs(useRecentBlocksStore())

const PLACEHOLDER_COUNT = 20

const props = defineProps({
  keyblocks: {
    type: Array,
    required: true,
  },
})

const keyblocksSequence = ref(null)

watch(
  () => props.keyblocks,
  async (newList, oldList) => {
    if (!oldList?.length || !newList?.length || newList.length <= oldList.length) return
    await nextTick()
    const el = keyblocksSequence.value
    // Only adjust scroll when a new block is prepended (WS), not when older ones are appended
    const wasPrepended = newList[0]?.hash !== oldList[0]?.hash
    if (wasPrepended && el.scrollLeft > 0) {
      const firstCell = el.querySelector('.keyblock-sequence__cell')
      if (firstCell) {
        el.scrollLeft += firstCell.offsetWidth + parseFloat(window.getComputedStyle(firstCell).marginRight || 0)
      }
    }
  })

watch(
  selectedKeyblock,
  async () => {
    if (isFirstKeyblockSelected.value) return
    await nextTick()
    const el = keyblocksSequence.value
    const activeCell = el.querySelector('.keyblock-sequence__cell--active')
    if (activeCell) {
      const elRect = el.getBoundingClientRect()
      const cellRect = activeCell.getBoundingClientRect()
      const targetScroll = el.scrollLeft + cellRect.left - elRect.left
        - (el.offsetWidth / 2) + (activeCell.offsetWidth / 2)
      el.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }
  })
</script>

<style scoped>
.keyblock-sequence {
  position: relative;
  padding: 0 var(--space-1);

  @media (--desktop) {
    padding: 0 var(--space-1);
  }

  &__sequence {
    display: flex;
    height: calc(40px + 16px);
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    /*animation overflow workaround*/
    margin-left: -8px;
    padding: var(--space-1);

    @media (--desktop) {
      padding: var(--space-1) 0;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__items,
  &__placeholders {
    display: flex;
    align-items: stretch;
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    min-width: 40px;
    height: 100%;

    border-radius: 4px;
    margin-right: var(--space-3);
    background: var(--color-midnight-35);

    color: var(--color-white);
    font-family: var(--font-monospaced);
    font-size: 14px;
    cursor: pointer;

    &:before {
      content: '=';
      position: absolute;
      left: -12px;
      color: var(--color-midnight);

      @media (--desktop) {
        left: -16px;
      }
    }

    &:first-child:not(.keyblock-sequence__cell--placeholder) {
      box-shadow: 0 0 0 0 var(--color-midnight-35);
      transform: scale(1);
      animation: pulse 2s infinite;

      &:before {
        content: '';
      }
    }

    @media (--desktop) {
      margin-right: var(--space-4);
    }

    &--placeholder {
      background: var(--color-midnight-15);
      cursor: default;
      animation: shimmer 1.2s ease-in-out infinite;

      &:first-child:before {
        content: '=';
      }
    }

    &--empty {
      background: var(--color-midnight-15);
      color: var(--color-midnight);
    }

    &--active {
      background: var(--color-fire);

      &:first-child:not(.keyblock-sequence__cell--placeholder) {
        box-shadow: 0 0 0 0 var(--color-fire);
        transform: scale(1);
        animation: pulse-active 2s infinite;
      }
    }
  }

  &__tooltip {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    white-space: nowrap;
    font-family: var(--font-monospaced);
    font-size: 12px;
  }

  &__overlay {
    width: 80px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    background-image: linear-gradient(90deg, rgb(255 255 255 / 0%) 0, rgb(255 255 255 / 100%) 100%);

    @media (--desktop) {
      width: 200px;
    }
  }

  &-move,
  &-enter-active,
  &-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  &-leave-active {
    position: absolute;
  }
}

@keyframes shimmer {

  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 0.7;
  }
}
</style>
