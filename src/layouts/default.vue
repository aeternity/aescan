<template>
  <div class="default-layout">
    <div class="default-layout__parallax">
      <div v-show="isLoading">
        <app-panel>
          <spinner-loader class="default-layout__spinner-loader"/>
        </app-panel>
      </div>

      <div v-show="!isLoading">
        <slot/>
      </div>
    </div>
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
.default-layout {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__spinner-loader {
    padding: var(--space-3) 0;
  }
}
</style>
