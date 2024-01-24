<template>
  <table>
    <tr>
      <th>File</th>
      <th/>
    </tr>
    <tr
      v-for="(file, index) in files"
      :key="index">
      <td>
        {{ file.webkitRelativePath || file.name }}
      </td>
      <td>
        <i v-if="index === entryFile.index">
          <small>
            entry file
          </small>
        </i>
        <div
          v-if="index !== entryFile.index"
          @click="emitEntryFile(file.name, index)">
          select as entry
        </div>
      </td>
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

const emit = defineEmits([
  'select-entry-file',
])

const emitEntryFile = (fileName, index) => {
  emit('select-entry-file', fileName, index)
}
</script>
