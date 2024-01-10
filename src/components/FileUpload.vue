<template>
  <div
    ref="dropArea"
    :class="[
      'file-upload',
      {'file-upload--dragover' :isDragging
      }]"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop">
    <label
      v-if="!tree"
      for="file"
      class="file-upload__label">
      {{ isDragging ? 'Release to drop files here.' : 'Drop files here or click here to upload.' }}
    </label>

    <contracts-file-list
      v-for="subtree in tree"
      :node="subtree"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dropArea = ref()
const tree = ref()
const isDragging = ref(false)

function dragover(event) {
  event.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function drop(event) {
  console.log('event', event)
  const items = event.dataTransfer.items

  event.preventDefault()
  console.log('items', items)

  getFilesDataTransferItems(items).then(files => {
    console.log('files', files)
    const rawOutput = JSON.stringify(files)
    tree.value = files
  })
}

function getFilesDataTransferItems(dataTransferItems) {
  function traverseFileTreePromise(item, path = '', folder) {
    return new Promise(resolve => {
      if (item.isFile) {
        item.file(file => {
          file.filepath = file.name // save full path
          folder.push(file)
          resolve(file)
        })
      } else if (item.isDirectory) {
        const dirReader = item.createReader()
        dirReader.readEntries(entries => {
          const entriesPromises = []
          const subfolder = []

          folder.push({ name: item.name, subfolder })
          for (const entr of entries) {
            entriesPromises.push(
              traverseFileTreePromise(entr, path || '' + item.name + '/', subfolder),
            )
          }
          resolve(Promise.all(entriesPromises))
        })
      }
    })
  }

  const files = []
  return new Promise((resolve, reject) => {
    const entriesPromises = []
    for (const it of dataTransferItems) {
      entriesPromises.push(
        traverseFileTreePromise(it.webkitGetAsEntry(), null, files),
      )
    }
    Promise.all(entriesPromises).then(entries => {
      resolve(files)
    })
  })
}

</script>

<style scoped>
.file-upload {
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

  &__preview {
    margin-top: var(--space-3);
  }

  &__preview-card {
    display: flex;
    justify-content: space-between;
    border: 1px solid var(--color-midnight-35);
    background: var(--color-white);
    margin: var(--space-0);
    padding: var(--space-0);
  }

  &__button {
    display: flex;
    flex-direction: row;
    align-items: center;

    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
