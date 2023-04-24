<template>
  <app-panel class="name-pointers-special-panel">
    <h2 class="name-pointers-special-panel__heading h3">
      SPECIAL POINTERS
    </h2>
    <table>
      <tbody>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            Account
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.account"
              :to="`/accounts/${name.specialPointers.account}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.account }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">{{
                formatEllipseHash(name.specialPointers.account)
              }}</span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            Channel
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.channel"
              :to="`/accounts/${name.specialPointers.channel}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.channel }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
                {{ formatEllipseHash(name.specialPointers.channel) }}
              </span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            Smart Contract
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.contract"
              :to="`/contracts/${name.specialPointers.contract}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.contract }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
                {{ formatEllipseHash(name.specialPointers.contract) }}
              </span>
            </app-link>
            <template v-else>
              -
            </template>
          </td>
        </tr>
        <tr class="name-pointers-special-panel__row">
          <th class="name-pointers-special-panel__table-header">
            Oracle
          </th>
          <td class="name-pointers-special-panel__data">
            <app-link
              v-if="name.specialPointers.oracle"
              :to="`/oracle/${name.specialPointers.oracle}`">
              <span class="name-pointers-special-panel__link-text">
                {{ name.specialPointers.oracle }}
              </span>
              <span class="name-pointers-special-panel__link-text-ellipse">
                {{ formatEllipseHash(name.specialPointers.oracle) }}
              </span>
            </app-link>

            <template v-else>
              -
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useNameDetailsStore } from '@/stores/nameDetails'
import { formatEllipseHash } from '@/utils/format'
import AppLink from '@/components/AppLink'

export default {
  name: 'NamePointersSpecialPanel',
  components: {
    AppLink,
    AppPanel,
  },
  computed: {
    ...mapState(useNameDetailsStore, ['name']),
  },
  methods: {
    formatEllipseHash,
  },
}
</script>

<style scoped>
.name-pointers-special-panel {
  padding: var(--space-4) var(--space-1) var(--space-3);

  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-3);
  }

  &__heading {
    margin-bottom: var(--space-1);
    @media (--desktop) {
      margin-bottom: 0;
    }
  }

  &__data {
    text-align: right;
  }

  &__link-text {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__link-text-ellipse {
    @media (--desktop) {
      display: none;
    }
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
