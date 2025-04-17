<template>
  <nuxt-link
    v-if="isLocalLink(to)"
    :to="to"
    :class="['link', { 'link--primary': variant === 'primary' }, { 'link--text-link': isTextLink }]"
    active-class="link--active"
    exact-active-class="link--exact-active">
    <slot/>
  </nuxt-link>
  <a
    v-else
    :rel="isOpenedInNewTab ? 'noopener noreferrer' : false"
    :target="target"
    :href="to"
    :class="['link', { 'link--primary': variant === 'primary' }, { 'link--text-link': isTextLink }]">
    <slot/>
  </a>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: '_blank',
  },
  variant: {
    type: String,
    default: null,
    validator: val => ['primary'].includes(val),
  },
  isTextLink: {
    type: Boolean,
    default: false,
  },
})

const isOpenedInNewTab = computed(
  () => props.target === '_blank',
)

function isLocalLink(url) {
  return typeof url === 'object' || url.charAt(0) === '/'
}
</script>

<style scoped>
.link {
  &--primary {
    color: var(--color-fire);
  }

  &--active {
    color: var(--color-fire) !important;
  }

  &--text-link {
    text-decoration: underline;
  }
}
</style>
