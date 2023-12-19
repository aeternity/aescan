<template>
  <div class="menu-item">
    <div class="menu-item__label">
      {{ item.name }}
    </div>
    <ul
      :class="[
        'menu-item__list',
        {'menu-item__list--collapsed': !item.active}]">
      <li
        v-for="subitem in item.submenu"
        :key="subitem.name"
        class="menu-item__item">
        <a
          :class="[
            'menu-item__link',
            {'menu-item__link--disabled': subitem.disabled}]">
          {{ subitem.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

</script>

<style scoped>

.menu-item {
  background: #fff;

  &__item {
    background: #fff;
    padding: var(--space-3) 0;
  }

  &__list {
    display: block;
    position: static;
    @media (--desktop) {
      position: absolute;
      top: 50px;
    }

    &--collapsed {
      display: none;
    }
  }

  &__link {
    padding: var(--space-3) 0;
    @media (--desktop) {
      position: relative;
      padding: 0;
    }

    &:hover {
      text-decoration: underline;
    }

    &--disabled {
      color: var(--color-midnight-35);
      cursor: default;
      pointer-events: none;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
