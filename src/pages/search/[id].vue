<template>
  <div
    v-if="namesFound && tokensFound"
    class="">
    <br>
    <!--    names found: {{ namesFound }}-->
    <table>
      <tr v-for="name in namesFound.data">
        <td>{{ name.payload.name }}</td>
      </tr>
    </table>

    <br>
    <br>
    <br>
    <!--    tokens found: {{ tokensFound }}-->
    <table>
      <tr v-for="token in tokensFound.data">
        <td>{{ token.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { useRoute, useRuntimeConfig } from '#app'
import axios from 'axios'

const route = useRoute()
const { MIDDLEWARE_URL } = useRuntimeConfig().public

onMounted(() => {
  searchByName(route.params.id)
})

const namesFound = ref([])
const tokensFound = ref([])

async function searchByName(name) {
  // todo promise
  const { data: namesdata } = await axios.get(`${MIDDLEWARE_URL}/v2/names/search?prefix=${name}`)
  const { data: tokensdata } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9?limit=10&prefix=${name}`)
  console.log('namesdata', namesdata)
  namesFound.value = namesdata
  tokensFound.value = tokensdata
}

</script>
