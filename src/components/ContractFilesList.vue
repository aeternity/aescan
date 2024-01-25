<template>
  <ul class="file-list">
    <li
      v-for="(file, index) in files"
      :key="index"
      class="file-list__item">
      <span
        :class="[
          'file-list__item__name',
          {'file-list__item__name--entry': index === entryFile.index}]"
        @click="emitEntryFile(file.name, index)">
        {{ file.webkitRelativePath || file.name }}
        <app-chip v-if="index === entryFile.index">
          entry file
        </app-chip>
        <app-button
          v-if="index !== entryFile.index"
          variant="link"
          class="file-list__item__button">
          select as entry
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

const emitEntryFile = (fileName, index) => {
  emit('select-entry-file', fileName, index)
}
</script>

<style scoped>
.file-list {
  &__item {
    font-family: var(--font-monospaced);
    font-weight: 400;
    font-size: 16px;
    padding: 8px 0;
    text-align: left;
    border-bottom: 1px solid var(--color-midnight-25);
    vertical-align: middle;

    :last-of-type {
      border-bottom: 0;
    }

    @media (--desktop) {
      padding: 10px var(--space-0) var(--space-1);
    }

    &__name--entry {
      font-weight: bold;
    }

    &__button {
      visibility: visible;

      @media (--desktop) {
        visibility: hidden;
      }

      &:hover {
        visibility: visible;
      }
    }
  }
}
</style>
