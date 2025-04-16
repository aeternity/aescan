<template>
  <div>
    <header class="contracts-file-upload__header">
      <span>
        Contract Files
        <hint-tooltip>
          Uploading file is required.
          <br>
          Selecting entry file is required. Entry file is the main file of Smart Contract including child files.
        </hint-tooltip>
      </span>
    </header>
    <div
      :class="[
        'contracts-file-upload__drop-area',
        { 'contracts-file-upload__drop-area--dragover': isDragging }]"
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
        @change="addInputFilesToSelectedFiles">
      <contract-file-list
        v-if="hasSelectedFiles"
        :files="selectedFiles"
        :entry-file="entryFile"
        @select-entry-file="selectEntryFile"/>

      <label
        class="contracts-file-upload__label"
        for="file">
        <template v-if="isDragging">Release to drop files here.</template>
        <template v-else>
          Drop files to area or <a class="contracts-file-upload__link">click here</a> to upload.
        </template>
        <app-button
          v-if="hasSelectedFiles"
          class="contracts-file-upload__button"
          variant="link-error"
          @click="clear">
          <app-icon
            class="contracts-file-upload__icon"
            name="cross"
            size="18"/>
          clear files
        </app-button>
      </label>
    </div>
  </div>
</template>

<script setup>
const fileInput = ref()
const selectedFiles = ref([])
const entryFile = ref({})
const isDragging = ref(false)

const emit = defineEmits([
  'update:selected-files',
  'update:entry-file',
])

const hasSelectedFiles = computed(() => {
  return selectedFiles.value.length > 0
})

function addInputFilesToSelectedFiles() {
  const isFirstFilesAddition = !hasSelectedFiles.value

  // chrome workaround to manually set webkitRelativePath
  Array.from(fileInput.value.files).forEach((file) => {
    Object.defineProperty(file, 'webkitRelativePath', {
      value: file.name,
    })
  })

  selectedFiles.value.push(...fileInput.value.files)
  emit('update:selected-files', selectedFiles.value)
  if (isFirstFilesAddition) {
    selectEntryFile(selectedFiles.value[0], 0)
  }
}

function addDroppedFilesToSelectedFiles(isFirstFilesAddition) {
  const fileList = new DataTransfer()
  selectedFiles.value.forEach((file) => fileList.items.add(file))
  emit('update:selected-files', fileList.files)

  if (isFirstFilesAddition) {
    selectEntryFile(selectedFiles.value[0], 0)
  }
}

function drop(event) {
  event.preventDefault()
  const isFirstFilesAddition = !hasSelectedFiles.value

  getDataTransferItems(event.dataTransfer.items).then(() => {
    addDroppedFilesToSelectedFiles(isFirstFilesAddition)
  })
  isDragging.value = false
}

function selectEntryFile(file, index) {
  const name = file.webkitRelativePath
  entryFile.value = { index, name }
  emit('update:entry-file', name)
}

function clear() {
  selectedFiles.value = []
  emit('update:selected-files', selectedFiles.value)
}

function dragover(event) {
  event.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function getFileEntry(entry, files) {
  if (entry.isFile) {
    return getSingleFile(entry, files)
  } else if (entry.isDirectory) {
    return getDirectoryFiles(entry, files)
  }
}

function getSingleFile(fileEntry, files) {
  return new Promise((resolve) => {
    fileEntry.file((file) => {
      // chrome workaround to manually set webkitRelativePath
      Object.defineProperty(file, 'webkitRelativePath', {
        value: fileEntry.fullPath.substring(1),
      })
      files.push(file)
      selectedFiles.value.push(file)
      resolve(file)
    })
  })
}

function getDirectoryFiles(dirEntry, files) {
  const dirReader = dirEntry.createReader()

  return new Promise((resolve) => {
    dirReader.readEntries((entries) => {
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

async function getDataTransferItems(dataTransferItems) {
  const entriesPromises = []
  const files = []

  for (const item of dataTransferItems) {
    entriesPromises.push(getFileEntry(item.webkitGetAsEntry(), files))
  }

  await Promise.all(entriesPromises)
  return files
}
</script>

<style scoped>
.contracts-file-upload {
  &__drop-area {
    width: 100%;
    padding: var(--space-5);
    border: 2px dashed var(--color-midnight-35);
    border-radius: 8px;

    &--dragover {
      border: 2px solid var(--color-success);
    }
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 16px;
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

  &__icon {
    color: var(--color-fire);
  }

  &__link {
    margin: 0 var(--space-0);
  }
}
</style>
