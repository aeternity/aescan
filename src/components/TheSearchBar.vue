<template>
  <div class="search-bar">
    <input
      v-model="userQuery"
      class="search-bar__input"
      placeholder="Search accounts, transactions, names, contracts, oracles, state channels..."
      type="search"
      autofocus
      @keyup.enter="search">

    <button
      class="search-bar__submit"
      @click="search">
      <app-icon
        name="magnifying-glass"
        :size="21"/>
    </button>
  </div>
</template>
<script setup>
import { isAddressValid } from '@aeternity/aepp-sdk'
import AppIcon from '@/components/AppIcon'
import { useNameDetailsStore } from '@/stores/nameDetails'

const { isNameAvailable } = useNameDetailsStore()
const userQuery = ref('')
const { push } = useRouter()

const query = computed(() => {
  const trimmedQuery = userQuery.value.trim()
  return trimmedQuery.endsWith('.chain')
    ? trimmedQuery.slice(0, -6)
    : trimmedQuery
})

async function search() {
  if (!query.value) {
    return
  }

  if (isAccountAddress(query.value)) {
    push(`/accounts/${query.value}`)
  } else if (isTransactionHash(query.value)) {
    push(`/transactions/${query.value}`)
  } else if (isContractId(query.value)) {
    push(`/contracts/${query.value}`)
  } else if (isOracleId(query.value)) {
    push(`/oracles/${query.value}`)
  } else if (isNameId(query.value)) {
    push(`/names/${query.value}`)
  } else if (isStateChannelId(query.value)) {
    push(`/state-channels/${query.value}`)
  } else if (await isAccountName(query.value)) {
    push(`/names/${query.value}.chain`)
  } else {
    push(`/error/${userQuery.value}`)
  }
  userQuery.value = ''
}

function isAccountAddress(query) {
  return isAddressValid(query) && query.startsWith('ak_')
}

function isNameId(query) {
  return isAddressValid(query) && query.startsWith('nm_')
}

function isTransactionHash(query) {
  return isAddressValid(query) && query.startsWith('th_')
}

function isContractId(query) {
  return isAddressValid(query) && query.startsWith('ct_')
}

function isOracleId(query) {
  return isAddressValid(query) && query.startsWith('ok_')
}

function isStateChannelId(query) {
  return isAddressValid(query) && query.startsWith('ch_')
}

async function isAccountName(query) {
  return await isNameAvailable(query)
}
</script>

<style scoped>
.search-bar {
  padding: var(--space-1) 10px var(--space-1) var(--space-3);
  display: flex;
  align-items: center;

  height: 40px;
  background: var(--color-white);
  border: 1px solid var(--color-midnight-55);
  border-radius: 8px;

  &__submit {
    margin: auto;
    padding: 0;
    border: none;
    background: inherit;
    cursor: pointer;
    color: var(--color-midnight);
  }

  &__input {
    width: 100%;
    border: none;
    background-color: var(--color-white);
    margin-right: var(--space-1);
    font-size: 11px;
    appearance: none;
    font-family: var(--font-monospaced);

    @media (--desktop) {
      font-size: 14px;
    }

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
