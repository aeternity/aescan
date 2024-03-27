<template>
  <app-select
    v-model="selectedNetwork"
    class="network-select"
    :options="networks"
    track-by="name"
    label="name"
    :disabled="!hasAlternativeNetwork"
    :hide-selected="true"
    :searchable="false"
    @select="navigate"/>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import AppSelect from '@/components/AppSelect'

const { NETWORK_NAME, ALTERNATIVE_NETWORK_NAME, ALTERNATIVE_NETWORK_URL } = useRuntimeConfig().public
const selectedNetwork = ref({
  name: NETWORK_NAME,
})
const networks = ref([
  {
    name: NETWORK_NAME,
    url: null,
  },
  {
    name: ALTERNATIVE_NETWORK_NAME,
    url: ALTERNATIVE_NETWORK_URL,
  },
])

const hasAlternativeNetwork = computed(() => !!ALTERNATIVE_NETWORK_URL)
const navigate = selectedOption => window.location.replace(selectedOption.url)
</script>

<style scoped>
.network-select {
  width: 110px;
}
</style>
