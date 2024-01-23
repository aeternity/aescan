<template>
  <div>
    <header class="contracts-file-upload__header">
      <label>
        <!--    todo id for label-->
        Contract Files
        <hint-tooltip>
          Field is required
        </hint-tooltip>
      </label>
      <app-button
        v-if="hasSelectedFiles"
        class="contracts-file-upload__button"
        variant="link"
        @click="clear">
        <app-icon
          name="cross"
          size="18"/>
        clear files
      </app-button>
    </header>
    <div
      :class="[
        'contracts-file-upload',
        {'contracts-file-upload--dragover' :isDragging }]"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop">
      <input
        id="file"
        ref="fileInput"
        type="file"
        multiple
        name="file"
        class="contracts-file-upload__input"
        accept=".aes"
        @change="addFilesToSelectedFiles">
      <table v-if="hasSelectedFiles">
        <tr>
          <th>File</th>
          <th>Select Entry File</th>
        </tr>
        <tr
          v-for="(file, index) in selectedFiles"
          :key="index">
          <td>
            {{ file.webkitRelativePath || file.name }}
          </td>
          <td>
            <input
              type="radio"
              name="entry-file"
              @input="selectEntryFile(file.name)">
          </td>
        </tr>
      </table>

      <label
        for="file"
        class="contracts-file-upload__label">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref()
const isDragging = ref(false)
const selectedFiles = ref([])

const emit = defineEmits([
  'update:file-list',
  'update:entry-file',
])

const label = computed(() => isDragging.value
  ? 'Release to drop files here.'
  : 'Drop files here or click here to upload.',
)

const hasSelectedFiles = computed(() => selectedFiles.value && selectedFiles.value.length > 0)

function selectEntryFile(fileName) {
  emit('update:entry-file', fileName)
  // todo improve filename with path
}

function addFilesToSelectedFiles() {
  selectedFiles.value.push(...fileInput.value.files)
  emit('update:file-list', fileInput.value.files)
}

function addFilesToFileInput() {
  const fileList = new DataTransfer()
  selectedFiles.value.forEach(file => {
    return fileList.items.add(file)
  })

  fileInput.value.files = fileList.files
  emit('update:file-list', fileInput.value.files)
}

// todo reuse selectedFiles.value
// is fileInput.value.files necessary

function clear() {
  selectedFiles.value = []
}

function drop(event) {
  event.preventDefault()
  getFilesDataTransferItems(event.dataTransfer.items).then(() =>
    addFilesToFileInput(),
  )
  isDragging.value = false
}

function dragover(event) {
  event.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

async function getFilesDataTransferItems(dataTransferItems) {
  const files = []
  const entriesPromises = []

  for (const item of dataTransferItems) {
    entriesPromises.push(getFileEntry(item.webkitGetAsEntry(), files))
  }

  await Promise.all(entriesPromises)

  return files
}

function getFileEntry(entry, files) {
  if (entry.isFile) {
    return getSingleFile(entry, files)
  } else if (entry.isDirectory) {
    return getDirectoryFiles(entry, files)
  }
}

function getSingleFile(fileEntry, files) {
  return new Promise(resolve => {
    fileEntry.file(file => {
      files.push(file)
      selectedFiles.value.push(file)
      // todo return instead of push
      resolve(file)
    })
  })
}

function getDirectoryFiles(dirEntry, files) {
  const dirReader = dirEntry.createReader()

  return new Promise(resolve => {
    dirReader.readEntries(entries => {
      const entriesPromises = []
      const subfolder = []

      files.push({ name: dirEntry.name, subfolder })

      for (const entry of entries) {
        entriesPromises.push(getFileEntry(entry, subfolder))
      }

      Promise.all(entriesPromises).then(resolve)
    })
  })
}
</script>

<style scoped>
.contracts-file-upload {
  padding: var(--space-6);
  background: var(--color-snow);
  border: 2px dashed var(--color-midnight-35);
  border-radius: 8px;

  &--dragover {
    border: 2px solid var(--color-success);
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  &__label {
    font-size: 16px;
    display: block;
    cursor: pointer;
  }

  &__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;

    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
  }
}
</style>
