<template>
  <Head>
    <Title>Page Not Found</Title>
  </Head>

  <page-header>
    Page Not Found
  </page-header>

  <not-found-panel>
    Sorry, the page you requested was not found. Perhaps our Dashboard options will help you find the
    way.
  </not-found-panel>
</template>

<script setup>
setResponseStatus(404, 'Page Not Found')
</script>
