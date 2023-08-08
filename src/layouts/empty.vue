<template>
  <div v-show="isLoading">
    <app-panel>
      <spinner-loader class="empty-layout__spinner-loader"/>
    </app-panel>
  </div>

  <div v-show="!isLoading">
    <slot/>
  </div>
</template>

<script setup>

const nuxtApp = useNuxtApp()
const isLoading = ref(true)
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})

</script>

<style scoped>
.empty-layout {
  &__spinner-loader {
    padding: var(--space-3) 0;
  }
}
</style>
