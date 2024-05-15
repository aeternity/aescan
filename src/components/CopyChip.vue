<template>
  <app-chip
    ref="copyChip"
    class="copy-chip"
    size="sm"
    :variant="!isCopyAnimationActive ? 'dark' : 'success'">
    <div class="copy-chip__container">
      <div class="copy-chip__text">
        {{ textToDisplay }}
        <not-available-label
          v-if="!textToDisplay"
          class="copy-chip__not-available-label"/>
      </div>
      <copy-button
        v-if="!!textToDisplay"
        v-show="!isCopyAnimationActive"
        class="copy-chip__copy-button"
        :clipboard-text="clipboardText || label"
        variant="light"
        @copy:started="activateCopyAnimation"
        @copy:ended="deactivateCopyAnimation"/>
    </div>
  </app-chip>
</template>

<script setup>
import CopyButton from '@/components/CopyButton'
import AppChip from '@/components/AppChip'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  clipboardText: {
    type: String,
    default: null,
  },
})

const isCopyAnimationActive = ref(false)
const copyChip = ref(null)

const textToDisplay = computed(() =>
  isCopyAnimationActive.value ? 'Copied!' : props.label,
)

function activateCopyAnimation() {
  isCopyAnimationActive.value = true
  copyChip.value.$el.style.width = `${copyChip.value.$el.clientWidth}px`
}

function deactivateCopyAnimation() {
  isCopyAnimationActive.value = false
  copyChip.value.$el.style.width = ''
}
</script>

<style scoped>
.copy-chip {
  min-width: 39px;

  &__container {
    display: flex;
  }

  &__text {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  &__not-available-label {
    color: var(--color-white) !important;
  }

  &__copy-button {
    margin-left: var(--space-1);
  }
}
</style>
