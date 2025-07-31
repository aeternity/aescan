<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li
        v-for="menu in menuOptionsWithSubmenus"
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
const featureFlags = useFeatureFlags()

const menuOptions = ref([{
  name: 'Blockchain',
  isActive: false,
  submenu: [
    {
      name: 'Accounts',
      path: '/accounts',
    },
    {
      name: 'Transactions',
      path: '/transactions',
    },
    {
      name: 'Smart Contracts',
      path: '/contracts',
    },
    {
      name: 'Names',
      path: '/names',
    },
    {
      name: 'Keyblocks',
      path: '/keyblocks',
    },
    {
      name: 'Nodes',
      path: '/nodes',
      hidden: !featureFlags.nodes,
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
      name: 'Mining',
      path: '/mining',
      hidden: !featureFlags.mining,
    },
  ],
},
{
  name: 'Tokens',
  isActive: false,
  submenu: [
    {
      name: 'AE Coin',
      path: '/tokens/ae',
      hidden: !featureFlags.marketStats,
    },
    {
      name: 'AEX9 Tokens',
      path: '/tokens',
    },
    {
      name: 'AEX141 Tokens (NFTs)',
      path: '/nfts',
    },
    {
      name: 'DEX Trades',
      path: '/dex-trades',
      hidden: !featureFlags.dex,
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
      hidden: !featureFlags.smartContractVerification,
    },
  ],
},
{
  name: 'Charts',
  isActive: false,
  submenu: [
    {
      name: 'Price',
      path: '/charts/price',
    },
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
      name: 'Accounts',
      path: '/charts/accounts',
    },
    {
      name: 'Names',
      path: '/charts/names',
    },
    {
      name: 'Difficulty',
      path: '/charts/difficulty',
    },
    {
      name: 'Hashrate',
      path: '/charts/hashrate',
    },
  ],
}])

const menuOptionsWithSubmenus = computed(() =>
  menuOptions.value
    .map(menuOption => ({
      ...menuOption,
      submenu: menuOption.submenu.filter(submenu => !submenu.hidden),
    }))
    .filter(menuOption => menuOption.submenu.length > 0),
)

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
  menuOptions.value.forEach((item) => {
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
  isDesktopResolution.value = window.innerWidth >= 1280
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
