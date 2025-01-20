<template>
  <div class="menu-item">
    <header class="menu-item__header ">
      {{ menu.name }}
      <app-icon
        :class="['menu-item__icon', {'menu-item__icon--active': menu.isActive}]"
        name="caret-down"/>
    </header>
    <ul
      v-show="menu.isActive"
      class="menu-item__list">
      <li
        v-for="submenu in menu.submenu"
        :key="submenu.name">
        <app-link
          v-if="!submenu.isDisabled"
          :to="submenu.path"
          :class="[
            'menu-item__link',
            {'menu-item__link--disabled': submenu.isDisabled}]">
          {{ submenu.name }}
        </app-link>

        <coming-soon-tooltip v-else>
          <app-link
            :to="submenu.path"
            :class="[
              'menu-item__link',
              {'menu-item__link--disabled': submenu.isDisabled}]">
            {{ submenu.name }}
          </app-link>
        </coming-soon-tooltip>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.menu-item {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;

    padding: 0 var(--space-4) var(--space-1) var(--space-4);

    font-size: 20px;
    line-height: 28px;

    @media (--desktop) {
      padding: 0 var(--space-3);
      font-size: 16px;
      line-height: 24px;
    }
  }

  &__icon {
    margin: 3px 0 0 var(--space-0);

    &--active {
      transform: rotate(180deg);
    }
  }

  &__list {
    background: var(--color-white);
    padding: 0 0 var(--space-2) var(--space-1);
    animation: fade-in-up .2s ease;

    @media (--desktop) {
      position: absolute;
      top: 60px;
      z-index: 2;

      border-radius: 8px;
      border: 1px solid var(--color-midnight-15);
      box-shadow: 0 6px 30px #0000001a;
      padding: var(--space-0);
      min-width: 220px;
    }
  }

  &__link {
    display: inline-block;
    width: 100%;
    padding: var(--space-0) var(--space-3) var(--space-0) var(--space-4);
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.002em;
    color: var(--color-midnight);
    cursor: pointer;

    @media (--desktop) {
      padding: var(--space-2) var(--space-1);
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
