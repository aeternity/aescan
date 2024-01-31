<template>
  <monaco-editor
    v-model="codeModel"
    class="code-editor"
    :lang="lang"
    :options="{
      lineHeight: 20,
      fontFamily: 'Roboto Mono',
      fontSize: 16,
      readOnly: true,
      wordWrap: 'on',
    }"/>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: {
    required: true,
    type: String,
  },
  lang: {
    required: true,
    type: String,
  },
})

const codeModel = ref(props.code)
</script>

<style scoped>
.code-editor {
  height: 400px;
  border: 1px solid var(--color-midnight);
  border-radius: 8px
}
</style>

<style>
.monaco-editor,
.monaco-editor .overflow-guard {
  border-radius: 8px;
}
</style>
