<template>
  <div class="menu-item">
    <div class="menu-item__label h4">
      {{ menu.name }}
    </div>
    <ul
      :class="[
        'menu-item__list',
        {'menu-item__list--collapsed': !menu.isActive}]">
      <li
        v-for="submenu in menu.submenu"
        :key="submenu.name"
        class="menu-item__item">
        <a
          :class="[
            'menu-item__link',
            {'menu-item__link--disabled': submenu.isDisabled}]">
          {{ submenu.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  menu: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.menu-item {
  &__list {
    padding: var(--space-0);
    position: static;
    background: #fff;

    @media (--desktop) {
      border-radius: 6px;
      border: 1px solid #ddd;
      box-shadow: 0 6px 30px #0000001a;
      position: absolute;
      top: 60px;
    }

    &--collapsed {
      display: none;
    }
  }

  &__label {
    padding: 0 var(--space-3);
  }

  &__item {
    padding: var(--space-0) var(--space-3);
    @media (--desktop) {
      padding: var(--space-3) var(--space-1);
    }
  }

  &__link {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
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
