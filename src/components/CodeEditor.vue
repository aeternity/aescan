<template>
  <monaco-editor
    v-model="codeModel"
    class="code-editor"
    :lang="lang"
    :options="{
      lineHeight: 20,
      fontFamily: 'Roboto Mono',
      fontSize: 14,
      readOnly: true,
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      renderLineHighlight: 'none'
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
  border: 1px solid var(--color-midnight-55);
  border-radius: 8px
}
</style>

<style>
.code-editor .monaco-editor {
  border-radius: 8px;

  .overflow-guard {
    border-radius: 8px;
  }

  .line-numbers {
    color: var(--color-midnight-25)
  }

  .mtk1 {
    color: var(--color-midnight);
  }

  .mtk20 {
    color: var(--color-fire);
  }

  .mtk6,
  .mtk5,
  .mtk1 .bracket-highlighting-3,
  .mtk1 .bracket-highlighting-0 {
    color: var(--color-blue);
  }

  .bracket-highlighting-1,
  .mtk1 .bracket-highlighting-1,
  .mtk7 {
    color: var(--color-success);
  }

  }

  .line-numbers {
    color: var(--color-midnight-25)
  }

  .mtk1 {
    color: var(--color-midnight);
  }

  .mtk20 {
    color: var(--color-fire);
  }

  .mtk6,
  .mtk5,
  .mtk1 .bracket-highlighting-3,
  .mtk1 .bracket-highlighting-0 {
    color: var(--color-blue);
  }

  .bracket-highlighting-1,
  .mtk1 .bracket-highlighting-1,
  .mtk7 {
    color: var(--color-success)
  }

}
</style>
