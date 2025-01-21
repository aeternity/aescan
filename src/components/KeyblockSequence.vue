<template>
  <div class="keyblock-sequence">
    <TransitionGroup
      class="keyblock-sequence__sequence"
      name="keyblock-sequence"
      tag="div">
      <div
        v-for="keyblock in keyblocks"
        :key="keyblock.hash"
        :class="[
          'keyblock-sequence__cell',
          {
            'keyblock-sequence__cell--empty': keyblock?.microBlocksCount === 0,
            'keyblock-sequence__cell--active': keyblock.hash === selectedKeyblock.hash
          }]"
        @click="selectKeyblock(keyblock)">
        {{ keyblock?.microBlocksCount }}
      </div>
    </TransitionGroup>
    <div class="keyblock-sequence__overlay"/>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'

const recentBlocksStore = useRecentBlocksStore()
const { selectKeyblock } = recentBlocksStore
const { selectedKeyblock } = storeToRefs(recentBlocksStore)

defineProps({
  keyblocks: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.keyblock-sequence {
  position: relative;

  @media (--desktop) {
    padding: var(--space-1) 0;
  }

  &__sequence {
    display: flex;
    height: calc(40px + 16px);
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    /*animation overflow workaround*/
    margin: calc(-1 * var(--space-1));
    padding: var(--space-1);

    &::-webkit-scrollbar {
      display: none;
    }
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

    &:first-child {
      box-shadow: 0 0 0 0 var(--color-midnight-35);
      transform: scale(1);
      animation: pulse 2s infinite;
    }

    @media (--desktop) {
      margin-right: var(--space-4);
    }

    &--empty {
      background: var(--color-midnight-15);
      color: var(--color-midnight);
    }

    &--active {
      background: var(--color-fire);

      &:first-child {
        box-shadow: 0 0 0 0 var(--color-fire);
        transform: scale(1);
        animation: pulse-active 2s infinite;
      }
    }
  }

  &__overlay {
    width: 80px;
    height: 100%;
    position: absolute;
    right: -8px;
    top: 0;
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
</style>
