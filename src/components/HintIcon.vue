<template>
  <app-icon
    name="question"
    :size="19"
    class="hint-icon"/>
</template>
<script>
import AppIcon from '@/components/AppIcon'

export default {
  name: 'HintIcon',
  components: { AppIcon },
}
</script>

<style scoped>
.hint-icon {
  color: var(--color-midnight-25);
  cursor: help;
}
</style>
