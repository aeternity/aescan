<template>
  <canvas
    ref="identicon"
    class="app-identicon"/>
</template>
<script>
import { renderIcon } from '@download/blockies'

export default {
  name: 'AppIdenticon',
  // todo switch to composition
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  watch: {
    address() {
      this.render()
    },
  },
  mounted() {
    this.render()
  },
  methods: {
    render() {
      renderIcon(
        { seed: this.id },
        this.$refs.identicon,
      )
    },
  },
}
</script>

<style scoped>
.app-identicon {
    display: inline-block;
    border-radius: 50%;
}
</style>
