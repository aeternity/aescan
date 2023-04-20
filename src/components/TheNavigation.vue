<template>
  <div>
    <ul class="navigation">
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/transactions"
          @click="$emit('link-clicked')">
          Transactions
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/names"
          @click="$emit('link-clicked')">
          Names
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/contracts"
          @click="$emit('link-clicked')">
          Smart Contracts
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/tokens"
          @click="$emit('link-clicked')">
          Tokens
        </app-link>
      </li>
      <li class="navigation__item">
        <coming-soon-tooltip>
          <app-link
            class="navigation__link navigation__link--disabled"
            target="_self"
            to="#">
            Oracles
          </app-link>
        </coming-soon-tooltip>
      </li>
      <li class="navigation__item">
        <coming-soon-tooltip>
          <app-link
            class="navigation__link navigation__link--disabled"
            target="_self"
            to="#">
            State Channels
          </app-link>
        </coming-soon-tooltip>
      </li>
      <li class="navigation__item">
        <coming-soon-tooltip>
          <app-link
            class="navigation__link navigation__link--disabled"
            target="_self"
            to="#">
            Hyperchains
          </app-link>
        </coming-soon-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink'
import ComingSoonTooltip from '@/components/ComingSoonTooltip'

export default {
  name: 'TheNavigation',
  components: { AppLink, ComingSoonTooltip },
  emits: ['link-clicked'],
}
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;

  @media (--desktop) {
    gap: var(--space-3);
    flex-direction: row;
  }

  &__item {
    text-align: center;
  }

  &__link {
    color: var(--color-midnight);
    display: block;
    padding: var(--space-3) 0;
    font-size: 16px;
    line-height: 24px;

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
</style>
