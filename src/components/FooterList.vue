<template>
  <div>
    <h4 class="footer-list__heading">
      {{ title }}
    </h4>
    <hr>
    <ul class="footer-list__list">
      <li
        v-for="link in links"
        :key="link.label"
        class="footer-list__item">
        <app-link
          :to="link.url"
          class="footer-list__link">
          {{ link.label }}
        </app-link>
      </li>
    </ul>
  </div>
</template>
<script>
import AppLink from '@/components/AppLink'

export default {
  name: 'FooterList',
  components: { AppLink },
  props: {
    title: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.footer-list {
  &__heading {
    margin-bottom: var(--space-0);
  }

  &__list {
    margin-top: var(--space-3);
    list-style: none;
  }

  &__item {
    margin-bottom: var(--space-3);
    font-size: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-midnight);

    &:hover {
      text-decoration: underline;
    }
  }

  &__tooltip {
    display: inline-block;
  }
}
</style>
