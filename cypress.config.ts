import { defineConfig } from 'cypress'
import constants from './constants'
import { cypressSplit } from 'cypress-split'
const { APP } = constants

export default defineConfig({
  projectId: 'bngtcp',
  env: {
    coverage: true,
  },
  retries: {
    openMode: 0,
    runMode: 1,
  },
  videoUploadOnPasses: false,
  viewportHeight: 550,
  viewportWidth: 700,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // cypressSplit(on, config)

      require('@cypress/code-coverage/task')(on, config);

      config.env.googleEnabled = process.env.VUE_APP_GOOGLE_ENABLED
      config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
      config.env.googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID
      config.env.googleClientSecret = process.env.VUE_APP_GOOGLE_CLIENT_SECRET

      return config;
    },
    baseUrl: `http://localhost:${APP}`,
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) { },
    env: {
      coverage: false,
    },
    specPattern: 'src/**/*.spec.ts',
  },
})
