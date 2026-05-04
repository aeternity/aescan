<template>
  <app-tooltip>
    <button
      class="theme-toggle"
      @click="cycle">
      <client-only>
        <svg
          class="theme-toggle__icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg">
          <!-- Sun -->
          <template v-if="showSun">
            <circle
              cx="12"
              cy="12"
              r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </template>
          <!-- Moon -->
          <template v-else>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </template>
        </svg>
        <template #fallback>
          <span class="theme-toggle__placeholder"/>
        </template>
      </client-only>
    </button>

    <template #tooltip>
      Switch to {{ label }}
    </template>
  </app-tooltip>
</template>

<script setup>
const { theme, isDark, systemDark } = storeToRefs(useThemeStore())
const { cycle } = useThemeStore()

const nextTheme = computed(() => {
  if (theme.value === 'auto') return isDark.value ? 'light' : 'dark'
  return 'auto'
})

// Show sun when next action leads to a light result, moon for dark
const showSun = computed(() => {
  if (nextTheme.value === 'light') return true
  if (nextTheme.value === 'dark') return false
  // nextTheme === 'auto': preview what OS gives
  return !systemDark.value
})

const label = computed(() => ({
  auto: 'Auto',
  light: 'Light',
  dark: 'Dark',
}[nextTheme.value]))
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-midnight);
  cursor: pointer;
  line-height: 0;

  &:hover {
    opacity: 0.7;
  }

  &__placeholder {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>
