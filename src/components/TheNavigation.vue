<template>
  <nav>
    <ul class="navigation__list">
      <li
        v-for="menu in menuOptions"
        :key="menu.name"
        @click="toggle(menu.name)"
        @mouseover="open(menu.name)"
        @mouseleave="close">
        <menu-item :menu="menu"/>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// todo animations
// todo hover styles
// todo whitespacing
// todo styles cleanup
// todo isActive  /isDisabled
// fix imports
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
  ],
},
{
  name: 'Tokens',
  isActive: false,
  submenu: [
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
      path: '/trades',
      isDisabled: true,
    },
  ],
},
{
  name: 'Analytics',
  isActive: false,
  submenu: [
    {
      name: 'Top Accounts',
      path: '/tokens',
      isDisabled: true,
    },
    {
      name: 'Charts',
      path: '/charts',
      isDisabled: true,
    },
  ],
},
{
  name: 'Developers',
  isActive: false,
  submenu: [
    {
      name: 'Contract Verification',
      path: '/verification',
      isDisabled: true,
    },
  ],
}])

function open(name) {
  menuOptions.value.find(item => item.name === name).isActive = true
}

function toggle(name) {
  close()
  menuOptions.value.find(item => item.name === name).isActive = !menuOptions.value.find(item => item.name === name).isActive
}

function close() {
  menuOptions.value.forEach(item => {
    item.isActive = false
  })
}
</script>

<style scoped>
.navigation {
  &__list {
    display: flex;
    flex-direction: column;

    @media (--desktop) {
      gap: var(--space-5);
      flex-direction: row;
    }
  }
}
</style>
