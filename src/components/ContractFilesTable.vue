<template>
  <table>
    <tr>
      <th>File</th>
      <th/>
    </tr>
    <tr
      v-for="(file, index) in files"
      :key="index"
      class="tr">
      <!--      todo larger font-->
      <td
        :class="[
          'contract-files-table__cell',
          {'contract-files-table__cell--entry': index === entryFile.index}]"
        @click="emitEntryFile(file.name, index)">
        {{ file.webkitRelativePath || file.name }}
        <app-chip v-if="index === entryFile.index">
          entry file
        </app-chip>
        <app-button
          v-if="index !== entryFile.index"
          variant="link"
          class="contract-files-table__button">
          select as entry
        </app-button>
      </td>
      <td @click="emitEntryFile(file.name, index)"/>
    </tr>
  </table>
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

// todo rename to list

const emit = defineEmits(['select-entry-file'])

const emitEntryFile = (fileName, index) => {
  emit('select-entry-file', fileName, index)
}
</script>

<style scoped>
.contract-files-table__cell--entry {
  font-weight: bold;
}

.contract-files-table__button {
  visibility: hidden;
}

.contract-files-table__cell:hover .contract-files-table__button {
  visibility: visible;
}
</style>
