<template>
  <div
    v-show="isActive"
    class="tab">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppTab',
  inject: ['registerTab'],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  beforeMount() {
    this.registerTab(this)
  },
}
</script>
