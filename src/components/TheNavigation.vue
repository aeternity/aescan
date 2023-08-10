<template>
  <div>
    <ul class="navigation">
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/transactions">
          Transactions
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/names">
          Names
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/contracts">
          Smart Contracts
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/tokens">
          Tokens
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/oracles">
          Oracles
        </app-link>
      </li>
      <li class="navigation__item">
        <app-link
          class="navigation__link"
          to="/state-channels">
          State Channels
        </app-link>
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

<script setup>
import AppLink from '@/components/AppLink'
import ComingSoonTooltip from '@/components/ComingSoonTooltip'
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;

  @media (--desktop) {
    gap: var(--space-5);
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
    letter-spacing: 0.002em;

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
