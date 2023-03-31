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

<script>
import AppIcon from '@/components/AppIcon'

const ICON_COPY = 'copy-simple'
const ICON_SUCCESS = 'check'
const SUCCESS_ANIMATION_DURATION = 3000

export default {
  component: 'AppCopyButton',
  components: {
    AppIcon,
  },
  props: {
    clipboardText: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: null,
      validator: val => ['light'].includes(val),
    },
  },
  emits: ['copy:started', 'copy:ended'],
  data() {
    return {
      isCopySuccessful: false,
      successAnimationTimer: null,
    }
  },
  computed: {
    iconName() {
      return this.isCopySuccessful ? ICON_SUCCESS : ICON_COPY
    },
  },
  beforeUnmount() {
    clearTimeout(this.successAnimationTimer)
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.clipboardText)
      if (this.isCopySuccessful) {
        this.stopCopySuccessAnimation()
        this.isCopySuccessful = true
      }
      this.$emit('copy:started')
      this.successAnimationTimer = setTimeout(
        this.stopCopySuccessAnimation,
        SUCCESS_ANIMATION_DURATION,
      )
    },
    stopCopySuccessAnimation() {
      clearTimeout(this.successAnimationTimer)
      this.successAnimationTimer = null
      this.isCopySuccessful = false
      this.$emit('copy:ended')
    },
  },
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
