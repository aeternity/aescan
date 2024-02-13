<template>
  <app-accordion
    :items="entrypoints"
    :is-disabled="isDisabled">
    <template #content="{content: {item: aciItem, index}}">
      <div class="contract-entrypoint-accordion__container">
        <p>
          return type: <i>{{ aciItem.returns }}</i>
        </p>

        <text-input
          v-for="(argument, inputIndex) in aciItem.arguments"
          id="id"
          :key="inputIndex"
          v-model="form[aciItem.name + '-' + argument.name]"
          :placeholder="argument.type"
          type="text"
          class="contract-entrypoint-accordion__input"/>

        <loader-indicator-small v-if="loadingIndex === index"/>

        <app-button
          v-else
          type="submit"
          @click="doIt(aciItem, index, form)">
          Query
        </app-button>

        <p
          v-if="response[index]"
          :class="[
            'contract-entrypoint-accordion__response',
            {'contract-entrypoint-accordion__response--error': response[index].responseType === 'error' }
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
  isDisabled: {
    type: Boolean,
    default: false,
  },
  response: {
    type: Object,
    default: null,
  },
  loadingIndex: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['clicked'])

function doIt(aciItem, index) {
  emit('clicked', aciItem, index, form)
}
</script>

<style scoped>
.contract-entrypoint-accordion {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  &__response {
    font-weight: 600;

    &--error {
      color: red;
    }
  }
}
</style>
