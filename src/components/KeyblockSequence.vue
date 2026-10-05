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

  &__sequence {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    /* 12px padding on all sides: matches reference design (padding:12px on chip scroller).
       Arrow ::before is position:absolute; left:-16px. When scrolled right, the arrow at
       the leftmost visible chip will partially clip at the scroller’s left edge — same
       behavior as the reference where arrows are separate DOM elements. */
    padding: 12px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__items,
  &__placeholders {
    display: flex;
    align-items: center;
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;

    min-width: 32px;
    height: 30px;
    padding: 5px 8px;

    border: 1px solid var(--border);
    border-radius: 7px;
    margin-right: var(--space-3);
    background: var(--bg-elev2);

    color: var(--text);
    font-family: var(--font-monospaced);
    font-size: 12px;
    cursor: pointer;

    &:before {
      content: '←';
      position: absolute;
      left: calc(-1 * var(--space-3));
      width: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      color: var(--text-dim);
      font-size: 16px;
      line-height: 1;

      @media (--desktop) {
        left: calc(-1 * var(--space-4));
        width: var(--space-4);
      }
    }

    &:first-child:not(.keyblock-sequence__cell--placeholder) {
      &:before {
        content: '';
      }
    }

    @media (--desktop) {
      margin-right: var(--space-4);
    }

    &--placeholder {
      background: var(--bg-elev2);
      cursor: default;
      animation: shimmer 1.2s ease-in-out infinite;

      &:first-child:before {
        content: '←';
      }
    }

    &--empty {
      background: var(--bg);
      color: var(--text-faint);
      border-color: var(--border-soft);
    }

    &--active {
      background: var(--color-fire);
      border-color: var(--color-fire);
      color: var(--color-white);
      animation: ae-chip-pulse 1.3s ease-out infinite;
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
    background-image: linear-gradient(
      90deg,
      transparent 0,
      var(--bg-elev) 100%
    );

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
