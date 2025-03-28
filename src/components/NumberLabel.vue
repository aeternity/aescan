<template>
  <div class="number-label">
    <!--    todo more conditions conditions-->
    <app-tooltip>
      <!--      todo fix this-->
      <!--      {{ isNumberRounded ? '~' : '' }}-->
      {{ isRaw ? numeral(props.number).format('0,0.[0000000000000]') : `${numberFormatted}` }}
      <template #tooltip>
        {{ props.number < 1000 ? props.number : formatNumber(props.number) }}
      </template>
    </app-tooltip>
  </div>
</template>

<script setup>
import numeral from 'numeral'

const props = defineProps({
  number: {
    type: [String, Number],
    default: null,
  },
  maxDigits: {
    type: Number,
    default: undefined,
  },
  isRaw: {
    type: Boolean,
    default: false,
  },
})

const numberFormatted = computed(() =>
  formatNullable(formatNumber(props.number, props.maxDigits, props.isRaw)),
)

const isNumberRounded = computed(() => {
  return props.number.toString() !== numberFormatted.value
})

</script>

<style scoped>
.number-label {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__icon {
    max-width: 20px;
    height: 20px;
    margin-right: var(--space-1);
  }
}
</style>

<!--todo dont show tooltip when raw v-if="isRaw || !isNumberRounded"-->
<!--todo wire maxDigits-->
<!-- todo reuse formatnumber in formatprice-->
