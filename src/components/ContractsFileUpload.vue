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
      <app-button
        v-if="hasSelectedFiles"
        class="contracts-file-upload__button"
        variant="link"
        @click="clear">
        <app-icon
          name="cross"
          size="18"/>
        clear files
        <!--        todo styles-->
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
        @change="addFilesToList">
      <contract-files-table
        v-if="hasSelectedFiles"
        :files="selectedFiles"
        :entry-file="entryFile"
        @select-entry-file="selectEntryFile"/>

      <label
        for="file"
        class="contracts-file-upload__label">
        {{ label }}
      </label>
    </div>
  </div>
  <!--  <h4>selectedFiles {{ selectedFiles }}</h4>-->
  <!--  <div v-for="file in selectedFiles">-->
  <!--    {{ file.name }}-->
  <!--  </div>-->
  <!--  <br>-->
  <!--  <div v-if="fileInput">-->
  <!--    <h4> fileInput {{ fileInput.files }}</h4>-->
  <!--    <div v-for="file in fileInput.files">-->
  <!--      {{ file.name }}-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script setup>

const fileInput = ref()
const selectedFiles = ref([])
const entryFile = ref({})
const isDragging = ref(false)

const emit = defineEmits([
  'update:file-list',
  'update:entry-file',
])

const label = computed(() => isDragging.value
  ? 'Release to drop files here.'
  : 'Drop files here or click here to upload.',
)

const hasSelectedFiles = computed(() => {
  return selectedFiles.value.length > 0
})

function addFilesToList() {
  // todo conditional by style of input?
  // todo filelist as ref

  selectedFiles.value.push(...fileInput.value.files)

  const fileList = new DataTransfer()
  const size = fileList.files.length

  selectedFiles.value.forEach(file => {
    return fileList.items.add(file)
  })
  emit('update:file-list', fileList.files)

  if (!size) {
    selectEntryFile(fileList.files[0].name, 0)
  }
}

function drop(event) {
  event.preventDefault()
  getFilesDataTransferItems(event.dataTransfer.items).then(() =>
    addFilesToList(),
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

function clear() {
  selectedFiles.value = []
}

function selectEntryFile(entryFileName, entryFileIndex) {
  console.log('selectEntryFile', entryFileName, entryFileIndex)
  entryFile.value = { index: entryFileIndex, name: entryFileName }
  emit('update:entry-file', entryFileName)
  // todo improve filename with path
  // todo emit to model
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
  width: 100%;
  padding: var(--space-6);
  border: 2px dashed var(--color-midnight-35);
  border-radius: 8px;

  @media (--desktop) {
    width: 363px;
  }

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
