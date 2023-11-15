<template>
  <app-chip
    ref="container"
    class="copy-chip"
    size="sm"
    :variant="!isCopyAnimationActive ? 'dark' : 'success'">
    <div class="copy-chip__text">
      {{ textToDisplay }}
    </div>

    <copy-button
      v-show="!isCopyAnimationActive"
      :clipboard-text="clipboardText || label"
      variant="light"
      @copy:started="activateCopyAnimation"
      @copy:ended="deactivateCopyAnimation"/>
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
const container = ref(null)

const textToDisplay = computed(() =>
  isCopyAnimationActive.value ? 'Copied!' : props.label,
)

function activateCopyAnimation() {
  isCopyAnimationActive.value = true
  container.value.$el.style.width = `${container.value.$el.clientWidth}px`
}

function deactivateCopyAnimation() {
  isCopyAnimationActive.value = false
  container.value.$el.style.width = ''
}
</script>

<style scoped>
.copy-chip {
  min-width: 72px;

  &__text {
    margin-right: var(--space-1);
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
}
</style>
