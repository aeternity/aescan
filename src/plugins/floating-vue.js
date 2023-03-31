import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// workaround for https://github.com/Akryum/floating-vue/issues/912
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(FloatingVue)
})
