<template>
  <div class="number-label">
    <!--todo fix duplication of conditions-->
    <!--    isRaw: {{ isRaw }} <br>-->
    <!--    isNumberRounded: {{ isNumberRounded }} <br>-->
    <!--    {{ !isRaw || isNumberRounded }}-->
    <app-tooltip v-if="!isRaw ?? isNumberRounded">
      <!--      todo fix condition-->
      {{ isRaw ? numeral(props.number).format('0,0.[0000000000000]') : `${displayNumber}` }}
      <template #tooltip>
        <!--        {{ props.number < 1000 ? props.number : formatNumber(props.number) }}-->
        {{ numeral(props.number).format('0,0.[0000000000000]') }}
        <!--        {{ formatNumber(props.number) }}-->
        <!--        todo name variable 1000-->
      </template>
    </app-tooltip>
    <template v-else>
      {{ isRaw ? numeral(props.number).format('0,0.[0000000000000]') : `${displayNumber}` }}
    </template>
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
    // todo hasFullPrecision: {
    type: Boolean,
    default: false,
  },
})

// todo different naming, flip israw
// todo dont show tilda when 6200000

const numberFormatted = computed(() =>
  formatNullable(formatNumber(props.number, props.maxDigits, props.isRaw)),
)

const isNumberRounded = computed(() =>
  props.number.toString() !== numberFormatted.value,
)

const displayNumber = computed(() => {
  return `${isNumberRounded.value ? '~' : ''}${numberFormatted.value}`
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
