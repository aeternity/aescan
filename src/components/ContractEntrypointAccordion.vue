<template>
  <app-accordion
    :items="entrypoints"
    :is-disabled="isDisabled">
    <template #content="{ content: { item: aciItem, index } }">
      <div class="contract-entrypoint-accordion__container">
        <p>
          return type: <i>{{ aciItem.returns }}</i>
        </p>

        <text-input
          v-for="(arg, inputIndex) in aciItem.arguments"
          id="id"
          :key="inputIndex"
          v-model="form[aciItem.name + '-' + arg.name]"
          :placeholder="arg.type"
          type="text"
          class="contract-entrypoint-accordion__input"/>

        <loader-indicator-small v-if="loadingIndex === index"/>

        <app-button
          v-else
          type="submit"
          @click="query(aciItem, index, form)">
          Query
        </app-button>

        <p
          v-if="response[index]"
          :class="[
            'contract-entrypoint-accordion__response',
            { 'contract-entrypoint-accordion__response--error': response[index].responseType === 'error' },
          ]">
          {{ response[index].responseType === 'success' ? 'Return value' : 'Error' }}:
          {{ response[index].message }}
        </p>
      </div>
    </template>
  </app-accordion>
</template>

<script setup>
const form = ref({})

defineProps({
  entrypoints: {
    type: Array,
    required: true,
  },
  response: {
    type: Object,
    default: null,
  },
  loadingIndex: {
    type: Number,
    default: null,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['query-clicked'])

function query(aciItem, index) {
  emit('query-clicked', aciItem, index, form.value)
}
</script>

<style scoped>
.contract-entrypoint-accordion {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }

  &__response {
    font-weight: 600;

    &--error {
      color: red;
    }
  }
}
</style>
