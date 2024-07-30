import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { AeSdk, Node } from '@aeternity/aepp-sdk'

export const useAesdk = defineStore('aesdk', () => {
  const { NODE_URL } = useRuntimeConfig().public

  const node = new Node(NODE_URL, { ignoreVersion: true })

  const aeSdk = new AeSdk({
    nodes: [
      { name: 'mainnet', instance: node },
    ],
    compilerUrl: 'https://compiler.aepps.com',
  })

  return {
    aeSdk: computed(() => aeSdk),
  }
})
