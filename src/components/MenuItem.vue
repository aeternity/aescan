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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    /* Mobile */
    padding: 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text);
    cursor: pointer;
    transition: background var(--dur) var(--ease);

    &:hover {
      background: var(--bg-hover);
    }

    @media (--desktop) {
      padding: 7px 11px;
      font-size: 13.5px;
      font-weight: 500;
      border-radius: 8px;
      color: var(--text-dim);

      &:hover {
        background: var(--bg-hover);
        color: var(--text);
      }
    }
  }

  &__icon {
    flex-shrink: 0;
    transition: transform var(--dur) var(--ease);
    color: var(--text-faint);

    &--active {
      transform: rotate(180deg);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    /* Mobile: indented sub-list */
    margin: 1px 0 5px 22px;
    padding-left: 11px;
    border-left: 1.5px solid var(--border);
    animation: fade-in-up 0.15s ease;

    @media (--desktop) {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 60;
      margin: 0;
      padding: 6px;
      border-left: none;
      min-width: 210px;
      background: var(--bg-elev);
      border: 1px solid var(--border);
      border-radius: 11px;
      box-shadow: var(--shadow);
    }
  }

  &__link {
    display: block;
    width: 100%;
    padding: 9px 11px;
    font-size: 13.5px;
    line-height: 1.4;
    border-radius: 8px;
    color: var(--text-dim);
    cursor: pointer;
    transition: background var(--dur) var(--ease), color var(--dur) var(--ease);

    &:hover {
      background: var(--bg-hover);
      color: var(--text);
      text-decoration: none;
    }

    @media (--desktop) {
      padding: 8px 11px;
      font-size: 13px;
      border-radius: 7px;
    }

    &.router-link-active {
      background: var(--brand-soft);
      color: var(--brand);
      font-weight: 500;

      &:hover {
        background: var(--brand-soft);
        color: var(--brand);
      }
    }

    &--disabled {
      color: var(--text-faint);
      cursor: default;
      pointer-events: none;

      &:hover {
        background: transparent;
        text-decoration: none;
      }
    }
  }
}
</style>
