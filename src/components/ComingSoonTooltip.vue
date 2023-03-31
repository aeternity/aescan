<template>
  <app-tooltip>
    <slot/>

    <template #tooltip>
      Coming soon
    </template>
  </app-tooltip>
</template>

<script>
import AppTooltip from '@/components/AppTooltip'

export default {
  name: 'ComingSoonTooltip',
  components: {
    AppTooltip,
  },
}
</script>
