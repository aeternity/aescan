<template>
  <div class="menu-item">
    <div class="menu-item__label h4">
      {{ menu.name }}
    </div>
    <ul
      v-show="menu.isActive"
      class="menu-item__list">
      <li
        v-for="submenu in menu.submenu"
        :key="submenu.name"
        class="menu-item__item">
        <app-link
          :to="submenu.path"
          :class="[
            'menu-item__link',
            {'menu-item__link--disabled': submenu.isDisabled}]">
          {{ submenu.name }}
        </app-link>
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
    background: var(--color-white);
    padding: var(--space-0);
    animation: fade-in-up .2s ease;

    @media (--desktop) {
      position: absolute;
      top: 60px;
      border-radius: 8px;
      border: 1px solid var(--color-midnight-15);
      box-shadow: 0 6px 30px #0000001a;
      z-index: 2;
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
    cursor: pointer;

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
