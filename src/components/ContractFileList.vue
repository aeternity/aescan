<template>
  <ul class="contract-file-list">
    <li
      v-for="(file, index) in files"
      :key="index"
      class="contract-file-list__item">
      <span
        class="contract-file-list__label"
        @click="selectEntryFile(file.name, index)">
        {{ file.webkitRelativePath || file.name }}
        <app-chip
          v-if="index === entryFile.index"
          size="sm">
          entry file
        </app-chip>
        <app-button
          v-else
          variant="link"
          class="contract-file-list__button">
          select as entry file
        </app-button>
      </span>
    </li>
  </ul>
</template>

<script setup>

defineProps({
  files: {
    type: Array,
    required: true,
  },
  entryFile: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['select-entry-file'])

function selectEntryFile(fileName, index) {
  emit('select-entry-file', fileName, index)
}
</script>

<style scoped>
.contract-file-list {
  margin-bottom: var(--space-6);

  &__button {
    font-size: 12px;

    @media (--desktop) {
      visibility: hidden;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    height: 46px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    font-size: 16px;
    padding: var(--space-1) 0;
    border-bottom: 1px solid var(--color-midnight-25);
    cursor: pointer;

    &:last-child {
      border-bottom: 0;
    }

    @media (--desktop) {
      padding: 10px var(--space-0) var(--space-1);
    }

    &:hover .contract-file-list__button {
      visibility: visible;
    }
  }

  &__label--entry {
    font-weight: bold;
  }
}
</style>
