<template>
  <div class="microblocks-sequence">
    <TransitionGroup
      ref="microblocks-sequence"
      class="microblocks-sequence__sequence"
      name="microblocks-sequence"
      tag="div">
      <div
        v-for="microblock in microblocks"
        :key="microblock.hash"
        :class="[
          'microblocks-sequence__cell',
          {'microblocks-sequence__cell--active': microblock.hash === selectedMicroblock.hash }]"
        @click="select(microblock)">
        {{ microblock.transactions_count }}
      </div>
    </TransitionGroup>
    <div class="microblocks-sequence__overlay"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export default {
  name: 'MicroblocksSequence',
  props: {
    microblocks: {
      required: true,
      type: Array,
    },
  },
  computed: {
    ...mapState(useRecentBlocksStore, ['selectedMicroblock']),
  },
  watch: {
    selectedMicroblock(newBlock, oldBlock) {
      if (newBlock?.height !== oldBlock?.height) {
        this.$refs['microblocks-sequence'].$el.scrollLeft = 0
      }
    },
  },
  methods: {
    ...mapActions(useRecentBlocksStore, ['selectMicroblock']),
    select(microblock) {
      this.selectMicroblock(microblock)
    },
  },
}
</script>

<style scoped>
.microblocks-sequence {
  position: relative;

  &__sequence {
    display: flex;
    height: 24px;
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
    margin-right: var(--space-1);
    background: var(--color-midnight-35);

    color: var(--color-white);
    font-family: var(--font-monospaced);
    font-weight: 500;
    cursor: pointer;

    &--active {
      background: var(--color-fire);
    }
  }

  &__overlay {
    height: 100%;
    width: 80px;
    position: absolute;
    right: 0;
    top: 0;
    background-image: linear-gradient(90deg, rgba(247, 247, 247, 0) 0, rgba(247, 247, 247, 1) 100%);

    @media (--desktop) {
      width: 200px;
    }
  }

  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
