<template>
  <app-panel class="tokens-panel">
    <table>
      <tr>
        <th>a</th>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>

</script>

<style scoped>
.tokens-panel {
    padding: var(--space-4) var(--space-1);

    @media (--desktop) {
        padding: var(--space-4);
    }

    &__table {
        display: none;
        @media (--desktop) {
            display: revert;
        }
    }

    &__table-condensed {
        @media (--desktop) {
            display: none;
        }
    }
}
</style>
