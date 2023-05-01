<template>
  <div>
    <div v-if="name === 'Mint'">
      {{ args[0] }}
      <app-chip>{{ args[1] }}</app-chip>
      {{ data }}
    </div>
    <div v-else-if="name === 'Burn'">
      {{ args[0] }}
      <app-chip>{{ args[1] }}</app-chip>
      {{ data }}
    </div>
    <div v-else-if="name === 'Transfer'">
      <value-hash-ellipsed
        :hash="args[0]"
        :link-to="`/account/${args[0]}`"/>
      <transaction-arrow-right-icon/>
      <value-hash-ellipsed
        :hash="args[1]"
        :link-to="`/account/${args[1]}`"/>
      {{ args[2] }}
    </div>
    <div v-else-if="name === 'Allowance'">
      {{ args[0] }}
      <transaction-arrow-right-icon/>
      <app-chip>{{ args[1] }}</app-chip>
      {{ args[2] }}
      {{ data }}
    </div>
    <div v-else>
      N/A
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  args: {
    type: Object,
    required: true,
  },
})
</script>
