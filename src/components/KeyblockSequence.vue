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
            'keyblock-sequence__cell--empty': keyblock?.micro_blocks_count === 0,
            'keyblock-sequence__cell--active': keyblock.hash === selectedKeyblock.hash
          }]"
        @click="select(keyblock)">
        {{ keyblock?.micro_blocks_count }}
      </div>
    </TransitionGroup>
    <div class="keyblock-sequence__overlay"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export default {
  name: 'KeyblockSequence',
  props: {
    keyblocks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(useRecentBlocksStore, ['selectedKeyblock']),
  },
  methods: {
    ...mapActions(useRecentBlocksStore, ['selectKeyblock']),
    select(keyblock) {
      this.selectKeyblock(keyblock)
    },
  },
}
</script>

<style scoped>
.keyblock-sequence {
  position: relative;

  &__sequence {
    display: flex;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 100%;

    border-radius: 4px;
    margin-right: var(--space-3);
    background: var(--color-midnight-35);

    color: var(--color-white);
    font-family: var(--font-monospaced);
    font-size: 14px;
    cursor: pointer;

    @media (--desktop) {
      margin-right: var(--space-4);
    }

    &--empty {
      background: var(--color-midnight-15);
      color: var(--color-midnight);
    }

    &--active {
      background: var(--color-fire);
    }
  }

  &__overlay {
    width: 80px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 100%);

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
