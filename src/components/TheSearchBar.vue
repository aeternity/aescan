<template>
  <div class="search-bar">
    <button
      type="button"
      class="search-bar__submit"
      aria-label="Search"
      @click="search">
      <svg
        class="search-bar__icon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        aria-hidden="true">
        <circle
          cx="11"
          cy="11"
          r="7"/>
        <line
          x1="21"
          y1="21"
          x2="16.5"
          y2="16.5"/>
      </svg>
    </button>
    <input
      v-model="query"
      class="search-bar__input"
      placeholder="Search address, tx, block, token or name…"
      type="search"
      @keyup.enter="search">
  </div>
</template>

<script setup>
import { Encoding, isAddressValid } from '@aeternity/aepp-sdk'

const { isKeyblockMined, isNameClaimed } = useSearchStore()
const { push } = useRouter()

const query = ref('')

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
    return await isNameClaimed(query)
  } else {
    return false
  }
}

function isKeyblockId(query) {
  if (isAddressValid(query, Encoding.KeyBlockHash)) {
    return true
  }
  if (!isNaN(query)) {
    return isKeyblockMined(query)
  }
  return false
}

function isMicroblockId(query) {
  return isAddressValid(query, Encoding.MicroBlockHash)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 38px;
  padding: 0 12px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: border-color var(--dur) var(--ease);

  &:focus-within {
    border-color: var(--brand-line);
  }

  /* The magnifier doubles as the submit button (Enter works as well) */
  &__submit {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: 0;
    color: var(--text-faint);
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover {
      color: var(--text);
    }
  }

  &__icon {
    display: block;
  }

  &__input {
    flex: 1;
    min-width: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 13px;
    line-height: 1.2;
    padding: 0;
    margin: 0;
    /* Do NOT set height — let flex align-items: center handle it naturally.
       An explicit height causes Chrome to misalign the text inside inputs. */
    appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--text-faint);
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
}
</style>
