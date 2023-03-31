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

const config = useRuntimeConfig()

const selectedNetwork = ref({
  name: config.public.NETWORK_NAME,
})
const networks = ref([
  {
    name: config.public.NETWORK_NAME,
    url: null,
  },
  {
    name: config.public.ALTERNATIVE_NETWORK_NAME,
    url: config.public.ALTERNATIVE_NETWORK_URL,
  },
])

const hasAlternativeNetwork = computed(() => !!config.public.ALTERNATIVE_NETWORK_URL)
const navigate = selectedOption => window.location.replace(selectedOption.url)
</script>

<style scoped>
.network-select {
  width: 110px;
}
</style>
