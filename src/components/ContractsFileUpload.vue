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
        {'contracts-file-upload__drop-area--dragover' :isDragging }]"
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
        @change="addFilesFromFileInput">
      <contract-file-list
        v-if="hasSelectedFiles"
        :files="selectedFiles"
        :entry-file="entryFile"
        @select-entry-file="selectEntryFile"/>

      <!--      todo hover style-->
      <label
        class="contracts-file-upload__label"
        for="file">
        {{ label }}
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

const label = computed(() => isDragging.value
  ? 'Release to drop files here.'
  : 'Drop files here or click here to upload.',
)
// todo make it look like a link

const hasSelectedFiles = computed(() => {
  return selectedFiles.value.length > 0
})

function addFilesFromFileInput() {
  addFilesToList(fileInput.value.files)
}

function addFilesToList(fileList) {
  const isFirstFilesAddition = !selectedFiles.value.length
  selectedFiles.value = [...selectedFiles.value, ...fileList]
  emit('update:selected-files', selectedFiles.value)
  if (isFirstFilesAddition) {
    selectEntryFile(fileList[0].name, 0)
  }
}

function selectEntryFile(entryFileName, entryFileIndex) {
  entryFile.value = { index: entryFileIndex, name: entryFileName }
  emit('update:entry-file', entryFileName)
  // todo improve filename with path with multiple contracts
}

function drop(event) {
  event.preventDefault()
  getDataTransferItems(event.dataTransfer.items).then(fileEntries => {
    const fileList = new DataTransfer()
    fileEntries.forEach(file => fileList.items.add(file))
    addFilesToList(fileList.files)
  })
  isDragging.value = false
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
  return new Promise(resolve => {
    fileEntry.file(file => {
      files.push(file)
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

    @media (--desktop) {
      width: 600px;
    }

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
    color: var(--color-fire) !important;
  }
}
</style>
