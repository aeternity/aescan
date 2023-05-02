<template>
  <app-chip
    ref="container"
    :variant="!isCopyAnimationActive ? 'primary' : 'success'"
    class="copy-chip">
    <div class="copy-chip__text">
      {{ textToDisplay }}
    </div>

    <app-copy-button
      v-show="!isCopyAnimationActive"
      :clipboard-text="clipboardText || label"
      variant="light"
      class="copy-chip__copy-button"
      @copy:started="activateCopyAnimation"
      @copy:ended="deactivateCopyAnimation"/>
  </app-chip>
</template>

<script>
import AppCopyButton from '@/components/AppCopyButton'
import AppChip from '@/components/AppChip'

export default {
  component: 'CopyChip',
  components: {
    AppChip,
    AppCopyButton,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    clipboardText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isCopyAnimationActive: false,
    }
  },
  computed: {
    textToDisplay() {
      return this.isCopyAnimationActive ? 'Copied!' : this.label
    },
  },
  methods: {
    activateCopyAnimation() {
      this.isCopyAnimationActive = true
      this.$refs.container.$el.style.width = `${this.$refs.container.$el.clientWidth}px`
    },
    deactivateCopyAnimation() {
      this.isCopyAnimationActive = false
      this.$refs.container.$el.style.width = ''
    },
  },
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
