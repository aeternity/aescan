<template>
  <div class="menu-item">
    <div class="menu-item__label">
      {{ item.name }}
    </div>
    <ul :class="[ 'submenu',{'open': item.active}]">
      <li
        v-for="subitem in item.submenu"
        :key="subitem.name"
        class="menu-item__item">
        <a :class="['menu-item__link', {'menu-item__link--disabled': subitem.disabled}]">{{ subitem.name }}</a>
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

  &__link {
    /*color: var(--color-midnight);*/
    padding: var(--space-3) 0;
    /*display: block;*/
    /*width: 100%;*/
    @media (--desktop) {
      /*width: 170px;*/
      /*display: list-item;*/
      position: relative;
    }

    @media (--desktop) {
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

.submenu {
  display: none;
}

.open {
  display: block;
}

ul {
  position: static;
  @media (--desktop) {
    display: none;
    position: absolute;
    top: 43px;
  }
}

</style>
