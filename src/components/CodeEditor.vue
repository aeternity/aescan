<template>
  <monaco-editor
    v-model="codeModel"
    class="editor"
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

<style>
.editor {
  height: 400px;
  border: 1px solid var(--color-midnight);
  border-radius: 8px
}
</style>
