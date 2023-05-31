<template>
  <button
    :class="[
      'copy-button',
      variant ? `copy-button--${variant}` : null,
      { 'copy-button--success': isCopySuccessful },
    ]"
    @click="copyText">
    <app-icon
      :name="iconName"
      :size="20"/>
  </button>
</template>

<script setup>
import AppIcon from '@/components/AppIcon'

const ICON_COPY = 'copy-simple'
const ICON_SUCCESS = 'check'
const SUCCESS_ANIMATION_DURATION = 3000

const props = defineProps({
  clipboardText: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: null,
    validator: val => ['light'].includes(val),
  },
})
const emit = defineEmits(['copy:started', 'copy:ended'])

const isCopySuccessful = ref(false)
const successAnimationTimer = ref(null)

const iconName = computed(() => isCopySuccessful.value ? ICON_SUCCESS : ICON_COPY)

onBeforeUnmount(() => clearTimeout(successAnimationTimer.value))

function copyText() {
  navigator.clipboard.writeText(props.clipboardText)
  if (isCopySuccessful.value) {
    stopCopySuccessAnimation()
    isCopySuccessful.value = true
  }

  emit('copy:started')
  successAnimationTimer.value = setTimeout(
    stopCopySuccessAnimation,
    SUCCESS_ANIMATION_DURATION,
  )
}

function stopCopySuccessAnimation() {
  clearTimeout(successAnimationTimer.value)
  successAnimationTimer.value = null
  isCopySuccessful.value = false
  emit('copy:ended')
}
</script>

<style scoped>
.copy-button {
  color: var(--color-fire);
  cursor: pointer;
  border: 0;
  background: transparent;
  line-height: 0;
  margin: 0;
  padding: 0;
  text-transform: none;
  -webkit-appearance: button;

  &--light {
    color: var(--color-white);
  }

  &--success {
    animation: pulse 0.2s linear;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
