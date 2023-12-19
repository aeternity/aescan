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
  ],
},
{
  name: 'Tokens',
  active: false,
  submenu: [
    {
      name: 'NFTs',
      path: '/validators',
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
  structure.value.forEach(item => item.active = false)
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
