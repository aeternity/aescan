<template>
  <div class="search-bar">
    <search-select v-model="selectedEntity"/>
    <input
      v-model="userQuery"
      class="search-bar__input"
      placeholder="Search accounts, transactions, names, contracts, oracles, state channels, keyblocks, and microblocks"
      type="search"
      autofocus
      @keyup.enter="search">

    <button
      class="search-bar__button"
      @click="search">
      <app-icon
        name="magnifying-glass"
        :size="18"/>
    </button>
  </div>
</template>
<script setup>
import AppIcon from '@/components/AppIcon'
import SearchSelect from '@/components/SearchSelect'

const userQuery = ref('')
const { push } = useRouter()

const query = computed(() => {
  const trimmedQuery = userQuery.value.trim()
  return trimmedQuery.endsWith('.chain')
    ? trimmedQuery.slice(0, -6)
    : trimmedQuery
})

const selectedEntity = ref(null)

function search() {
  if (!query.value) {
    return
  }

  push(`/${selectedEntity.value?.url}/${query.value}`)
  userQuery.value = ''
}
</script>

<style scoped>
.search-bar {
  padding: var(--space-0);
  display: flex;
  align-items: center;
  justify-content: center;

  height: 42px;
  background: var(--color-white);
  border: 1px solid var(--color-midnight);
  border-radius: 8px;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 100%;
    border-radius: 4px;

    margin: auto;
    padding: 0;
    border: none;
    cursor: pointer;

    background: var(--color-midnight);
    color: var(--color-white);
  }

  &__input {
    flex-grow: 1;
    border: none;
    background-color: var(--color-white);
    margin: 0 var(--space-1);
    font-size: 14px;
    appearance: none;
    font-family: var(--font-monospaced);

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color: var(--color-midnight-35);
    }

    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: var(--color-midnight-35);
      opacity: 1;
    }

    &::placeholder { /* Most modern browsers support this now. */
      color: var(--color-midnight-35);
    }
  }
}
</style>
