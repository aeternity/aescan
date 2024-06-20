<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li
        v-for="menu in menuOptions"
        :key="menu.name"
        class="navigation__item"
        @click="toggle(menu.name)"
        @mouseover="isDesktopResolution ? open(menu.name) : null"
        @mouseleave="isDesktopResolution ? closeAll() : null">
        <menu-item :menu="menu"/>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { isDesktop } from '@/utils/screen'

const menuOptions = ref([{
  name: 'Blockchain',
  isActive: false,
  submenu: [
    {
      name: 'Transactions',
      path: '/transactions',
    },
    {
      name: 'Names',
      path: '/names',
    },
    {
      name: 'Smart Contracts',
      path: '/contracts',
    },
    {
      name: 'Oracles',
      path: '/oracles',
    },
    {
      name: 'State Channels',
      path: '/state-channels',
    },
    {
      name: 'Nodes',
      path: '/nodes',
    },
    {
      name: 'Hyperchains',
      path: '/hyperchains',
      isDisabled: true,
    },

  ],
},
{
  name: 'Tokens',
  isActive: false,
  submenu: [
    {
      name: 'AE Coin',
      path: '/tokens/AE',
    },
    {
      name: 'AEX9 Tokens',
      path: '/tokens',
    },
    {
      name: 'AEX141 Tokens (NFTs)',
      path: '/nfts',
    },
  ],
},
{
  name: 'Developers',
  isActive: false,
  submenu: [
    {
      name: 'Smart Contract Verification',
      path: '/contract-verification',
    },

  ],
},
{
  name: 'Charts',
  isActive: false,
  submenu: [
    {
      name: 'Transactions',
      path: '/charts/transactions',
    },
    {
      name: 'Keyblocks',
      path: '/charts/keyblocks',
    },
    {
      name: 'Smart Contracts',
      path: '/charts/contracts',
    },
    {
      name: 'Names',
      path: '/charts/names',
    },
  ],
}])

function open(name) {
  menuOptions.value.find(item => item.name === name).isActive = true
}

const activeItemName = computed(() => {
  const activeItem = menuOptions.value.find(item => item.isActive)
  return activeItem ? activeItem.name : null
})

function toggle(name) {
  if (activeItemName.value !== name) {
    closeAll()
    open(name)
  } else {
    closeAll()
  }
}

function closeAll() {
  menuOptions.value.forEach(item => {
    item.isActive = false
  })
}

onMounted(() => {
  updateIsDesktopResolution()
  window.addEventListener('resize', updateIsDesktopResolution)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsDesktopResolution)
})

const isDesktopResolution = ref(null)

function updateIsDesktopResolution() {
  isDesktopResolution.value = isDesktop()
}
</script>

<style scoped>
.navigation {
  &__list {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    margin-bottom: var(--space-4);

    @media (--desktop) {
      flex-direction: row;
      align-items: center;
      margin-bottom: 0;
    }
  }

  &__item {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
