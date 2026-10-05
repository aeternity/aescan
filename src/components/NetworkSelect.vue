<template>
  <div
    v-if="hasAlternativeNetwork"
    class="network-select"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space.prevent="toggle"
    @keydown.escape="isOpen = false">
    <span class="network-select__dot"/>
    <span class="network-select__label">{{ selectedNetwork.name }}</span>
    <svg
      :class="['network-select__chevron', {'network-select__chevron--open': isOpen}]"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>

    <div
      v-if="isOpen"
      class="network-select__dropdown"
      role="listbox">
      <button
        v-for="network in otherNetworks"
        :key="network.name"
        class="network-select__option"
        role="option"
        @click.stop="navigate(network)">
        {{ network.name }}
      </button>
    </div>
  </div>

  <div
    v-else
    class="network-select network-select--static">
    <span class="network-select__dot"/>
    <span class="network-select__label">{{ selectedNetwork.name }}</span>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'

const {
  NETWORK_NAME,
  ALTERNATIVE_NETWORK_NAME,
  ALTERNATIVE_NETWORK_URL,
} = useRuntimeConfig().public

const isOpen = ref(false)

const selectedNetwork = ref({ name: NETWORK_NAME })

const networks = ref([
  { name: NETWORK_NAME, url: null },
  { name: ALTERNATIVE_NETWORK_NAME, url: ALTERNATIVE_NETWORK_URL },
])

const otherNetworks = computed(() =>
  networks.value.filter(n => n.name !== selectedNetwork.value.name),
)

const hasAlternativeNetwork = computed(() => !!ALTERNATIVE_NETWORK_URL)

function toggle() {
  isOpen.value = !isOpen.value
}

function navigate(network) {
  isOpen.value = false
  window.location.replace(network.url)
}
</script>

<style scoped>
.network-select {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 11px;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: 9px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-dim);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  flex-shrink: 0;
  transition: border-color var(--dur) var(--ease), color var(--dur) var(--ease);

  &:hover {
    color: var(--text);
    border-color: var(--border);
  }

  &--static {
    cursor: default;
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--up);
    box-shadow: 0 0 0 3px var(--up-soft);
    flex-shrink: 0;
  }

  &__label {
    line-height: normal;
  }

  &__chevron {
    flex-shrink: 0;
    transition: transform var(--dur) var(--ease);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 100%;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: 9px;
    box-shadow: var(--shadow);
    padding: 4px;
    z-index: 60;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  &__option {
    display: block;
    width: 100%;
    padding: 8px 10px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-dim);
    background: transparent;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    text-align: left;
    transition: background var(--dur) var(--ease), color var(--dur) var(--ease);

    &:hover {
      background: var(--bg-hover);
      color: var(--text);
    }
  }
}
</style>
