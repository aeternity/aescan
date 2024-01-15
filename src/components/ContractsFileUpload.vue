<template>
  <div
    :class="[
      'contracts-file-upload',
      {'contracts-file-upload--dragover' :isDragging
      }]"
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

    <div
      v-for="(file, index) in selectedFiles"
      :key="index"
      class="contracts-file-upload__preview-card">
      <input
        type="radio"
        name="main-file">

      {{ file.webkitRelativePath || file.name }}
      <button
        class="contracts-file-upload__button"
        @click="removeFile(index)">
        <app-icon
          name="cross"
          size="18"/>
      </button>
    </div>

    <label
      for="file"
      class="contracts-file-upload__label">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref()
const isDragging = ref(false)
const selectedFiles = ref([])

const emit = defineEmits(['update-file'])

const label = computed(() => isDragging.value
  ? 'Release to drop files here.'
  : 'Drop files here or click here to upload.',
)

function addFilesToSelectedFiles() {
  selectedFiles.value.push(...fileInput.value.files)
}

function addFilesToFileInput() {
  const fileList = new DataTransfer()
  selectedFiles.value.forEach(file => {
    return fileList.items.add(file)
  })

  fileInput.value.files = fileList.files
  emit('update-file', fileInput.value.files)
}

// todo reuse selectedFiles.value
// is fileInput.value.files necessary

function removeFile(index) {
  selectedFiles.value.splice(index, 1)
}

function dragover(event) {
  event.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function drop(event) {
  event.preventDefault()
  getFilesDataTransferItems(event.dataTransfer.items).then(() =>
    addFilesToFileInput(),
  )
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

  &--dragover {
    border: 2px solid var(--color-success);
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

  &__preview-card {
    font-family: var(--font-monospaced);
    display: flex;
    align-items: center;
    border: 1px solid var(--color-gray);
    background: var(--color-white);
    margin: var(--space-0);
    padding: var(--space-0);
  }
}
</style>
