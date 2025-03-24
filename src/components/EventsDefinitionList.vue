<template>
  <dl class="event-definition-list">
    <template
      v-for="(argument, index) in args"
      :key="index">
      <dt class="event-definition-list__term">
        [arg{{ index }}]:
      </dt>
      <dd class="event-definition-list__value">
        {{ args }}
        <copy-button
          :clipboard-text="argument"
          size="sm"/>
      </dd>
    </template>
  </dl>
</template>

<script setup>
defineProps({
  args: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.event-definition-list {
  font-size: 11px;
  line-height: 16px;

  &__term {
    height: 16px;
  }

  &__value {
    color: var(--color-midnight-55);
    display: flex;
    gap: var(--space-0);
    word-break: break-all;
  }
}
</style>
