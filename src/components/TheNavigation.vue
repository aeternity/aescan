<template>
  <nav>
    <ul class="navigation__list">
      <li
        v-for="item in structure"
        :key="item.name"
        @click="toggle(item.name)"
        @mouseover="open(item.name)"
        @mouseleave="close">
        <menu-item :item="item"/>
      </li>
    </ul>
  </nav>
</template>

<script setup>

// todo animations
// todo naming
// todo hover styles
// todo whitespacing
// todo styles cleanup
// todo active  /disabled
// fix imports
const structure = ref([{
  name: 'Blockchain',
  active: false,
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
  active: false,
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
      disabled: true,
    },
  ],
},
{
  name: 'Analytics',
  active: false,
  submenu: [
    {
      name: 'Top Accounts',
      path: '/tokens',
      disabled: true,
    },
    {
      name: 'Charts',
      path: '/charts',
      disabled: true,
    },
  ],
},
{
  name: 'Developers',
  active: false,
  submenu: [
    {
      name: 'Contract Verification',
      path: '/verification',
      disabled: true,
    },
  ],
}])

function open(name) {
  structure.value.find(item => item.name === name).active = true
}

function toggle(name) {
  close()
  structure.value.find(item => item.name === name).active = !structure.value.find(item => item.name === name).active
}

function close() {
  structure.value.forEach(item => {
    item.active = false
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
