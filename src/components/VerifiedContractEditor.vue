<template>
  <monaco-editor
    v-model="contractCode.source[0].content "
    class="editor"
    lang="aes"
    :options="{
      lineHeight: 20,
      fontFamily: 'Roboto Mono',
      fontSize: 16,
      readOnly: true,
    }"/>
  <!--  todo loop-->
  <!--  todo print aci-->
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { useContractVerifiedStore } from '~/stores/contractVerified'

const route = useRoute()

const contractVerifiedStore = useContractVerifiedStore()
const { contractCode } = storeToRefs(contractVerifiedStore)
const { fetchContractCode } = contractVerifiedStore

await fetchContractCode(route.params.id)

defineProps({
  verificationDetails: {
    required: true,
    type: Object,
  },
})

</script>

<style>
.editor {
  height: 400px;
}
</style>
