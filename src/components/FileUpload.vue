<template>
  <div
    :class="[
      'file-upload',
      {'file-upload--dragover' :isDragging
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
      class="file-upload__input"
      accept=".aes"
      @change="addFile">

    <label
      for="file"
      class="file-upload__label">
      {{ isDragging ? 'Release to drop files here.' : 'Drop files here or click here to upload.' }}
    </label>

    <div
      v-if="files.length"
      class="file-upload__preview">
      <div
        v-for="file in files"
        :key="file.name"
        class="file-upload__preview-card">
        <div>
          <input type="radio">
          {{ file.name }} - {{ Math.round(file.size / 1000) + 'kb' }}
        </div>
        <div>
          <button
            class="file-upload__button"
            title="remove file"
            @click="removeFile(files.indexOf(file))">
            <app-icon
              name="cross"
              size="18"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDragging = ref(false)
const files = ref([])
const fileInput = ref()

function drop(event) {
  event.preventDefault()
  fileInput.value.files = event.dataTransfer.files
  addFile()
  isDragging.value = false
}

function dragover(event) {
  event.preventDefault()
  isDragging.value = true
}

function dragleave() {
  isDragging.value = false
}

function addFile() {
  files.value.push(...fileInput.value.files)
}

function removeFile(index) {
  files.value.splice(index, 1)
}

// function uploadFiles() {
//   const formData = new FormData()
//   files.value.forEach(file => {
//     formData.append('selectedFiles', file)
//   })
//
//   axios({
//     method: 'POST',
//     url: 'http://path/to/api/upload-files',
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }

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
