import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    url: 'http://localhost:8080',
    // todo pass variable
  },
  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 30000,
})
