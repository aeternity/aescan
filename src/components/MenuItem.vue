<template>
  <div class="menu-item">
    <div class="menu-item__label ">
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
  width: 100%;

  &__label {
    padding: 0 var(--space-3) var(--space-1) var(--space-3);
    font-size: 28px;
    line-height: 36px;

    @media (--desktop) {
      font-size: 20px;
      line-height: 28px;
    }
  }

  &__list {
    background: var(--color-white);
    padding: 0 0 var(--space-2);
    animation: fade-in-up .2s ease;

    @media (--desktop) {
      position: absolute;
      top: 60px;
      z-index: 2;
      border-radius: 8px;
      border: 1px solid var(--color-midnight-15);
      box-shadow: 0 6px 30px #0000001a;
      padding: var(--space-0);
    }
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
