<template>
  <button
    :class="[
      'pagination-button',
      $slots.default ? [`pagination-button--${direction}`] : [],
      {'pagination-button--disabled': disabled},
    ]"
    @click="!disabled && $emit('click')">
    <app-icon
      v-if="direction === 'left'"
      :size="16"
      name="caret-left"/>
    <slot/>

    <app-icon
      v-if="direction === 'right'"
      :size="16"
      name="caret-right"/>
  </button>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    required: true,
    validator: val => ['left', 'right'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.pagination-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 7px 15px;
  color: var(--text);
  background: var(--bg-elev);
  font-size: 12.5px;
  line-height: 18px;
  font-weight: 600;
  font-family: var(--font-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--brand);
    border-color: var(--brand-line);
  }

  &--left {
    padding-left: 11px;
  }

  &--right {
    padding-right: 11px;
  }

  &--disabled,
  &--disabled:hover {
    pointer-events: none;
    cursor: not-allowed;
    color: var(--text-faint);
    background: var(--bg-elev2);
    border-color: var(--border);
  }
}
</style>
