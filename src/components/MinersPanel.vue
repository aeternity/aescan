<template>
  <app-panel class="">
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Pool Url
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="miner in MINERS"
          :key="miner.name">
          <td>{{ miner.name }}</td>
          <td>{{ miner.url }}</td>
        </tr>
      </tbody>
    </table>
  </app-panel>
</template>

<script setup>

</script>
