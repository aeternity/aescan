const STORAGE_KEY = 'aescan-theme'
const THEMES = ['auto', 'light', 'dark']

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('auto')
  const systemDark = ref(false)

  const isDark = computed(() => {
    if (theme.value === 'dark') return true
    if (theme.value === 'light') return false
    return systemDark.value
  })

  function applyTheme(value) {
    if (!import.meta.client) return
    const html = document.documentElement
    if (value === 'dark') {
      html.setAttribute('data-theme', 'dark')
    } else if (value === 'light') {
      html.setAttribute('data-theme', 'light')
    } else {
      html.removeAttribute('data-theme')
    }
  }

  function setTheme(value) {
    if (!THEMES.includes(value)) return
    theme.value = value
    localStorage.setItem(STORAGE_KEY, value)
    applyTheme(value)
  }

  function cycle() {
    if (theme.value === 'auto') {
      setTheme(isDark.value ? 'light' : 'dark')
    } else {
      setTheme('auto')
    }
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem(STORAGE_KEY)
    const initial = THEMES.includes(stored) ? stored : 'auto'
    theme.value = initial
    applyTheme(initial)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = mq.matches
    mq.addEventListener('change', (e) => {
      systemDark.value = e.matches
    })
  }

  return { theme, isDark, systemDark, setTheme, cycle, init }
})
