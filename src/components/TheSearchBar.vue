<template>
  <div class="search-bar">
    <input
      v-model="query"
      class="search-bar__input"
      placeholder="Search accounts, transactions, names, contracts, oracles, state channels, keyblocks, and microblocks"
      type="search"
      autofocus
      @keyup.enter="search">
    <button
      class="search-bar__submit"
      @click="search">
      <app-icon
        name="magnifying-glass"
        :size="18"/>
    </button>
  </div>
</template>
<script setup>
import { isAddressValid, Encoding } from '@aeternity/aepp-sdk'
import AppIcon from '@/components/AppIcon'
import { useNameDetailsStore } from '@/stores/nameDetails'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetails'

const { isNameAvailable } = useNameDetailsStore()
const { isKeyblockAvailable } = useKeyblockDetailsStore()
const query = ref('')
const { push } = useRouter()

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
  } else if (isStateChannelId(query.value)) {
    push(`/state-channels/${query.value}`)
  } else if (isMicroblockId(query.value)) {
    push(`/microblocks/${query.value}`)
  } else if (isNameId(query.value)) {
    push(`/names/${query.value}`)
  } else if (await isName(query.value)) {
    push(`/names/${query.value}`)
  } else if (await isKeyblockId(query.value)) {
    push(`/keyblocks/${query.value}`)
  } else {
    push(`/search/${query.value}`)
  }
  query.value = ''
}

function isAccountAddress(query) {
  return isAddressValid(query)
}

function isNameId(query) {
  return isAddressValid(query, Encoding.Name)
}

function isTransactionHash(query) {
  return isAddressValid(query, Encoding.TxHash)
}

function isContractId(query) {
  return isAddressValid(query, Encoding.ContractAddress)
}

function isOracleId(query) {
  return isAddressValid(query, Encoding.OracleAddress)
}

function isStateChannelId(query) {
  return isAddressValid(query, Encoding.Channel)
}

async function isName(query) {
  if (query.endsWith('.test') || query.endsWith('.chain')) {
    return await isNameAvailable(query)
  } else {
    return false
  }
}

function isKeyblockId(query) {
  if (isAddressValid(query, Encoding.KeyBlockHash)) {
    return true
  }
  if (!isNaN(query)) {
    return isKeyblockAvailable(query)
  }
  return false
}

function isMicroblockId(query) {
  return isAddressValid(query, Encoding.MicroBlockHash)
}
</script>
<style scoped>
.search-bar {
  padding: 6px var(--space-0) 6px var(--space-3);
  display: flex;
  align-items: center;
  height: 40px;
  background: var(--color-white);
  border: 1px solid var(--color-midnight);
  border-radius: 8px;

  &__submit {
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
    width: 100%;
    border: none;
    background-color: var(--color-white);
    margin-right: var(--space-1);
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
