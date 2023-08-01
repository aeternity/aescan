<template>
  <div class="spinner-loader"/>
</template>

<style scoped>

.spinner-loader {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #b2b2b2 41%);
  /* stylelint-disable */
  background: linear-gradient(0deg, rgba(178, 178, 178, 0.5) 50%, rgba(178, 178, 178, 1) 0) center/4.5px 100%,
  linear-gradient(90deg, rgba(178, 178, 178, 0.25) 50%, rgba(178, 178, 178, 0.75) 0) center/100% 4.5px;
  /* stylelint-enable */
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1s infinite steps(12);

  &:before,
  &:after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }

  &:after {
    opacity: 0.83;
    transform: rotate(60deg);
  }
}

@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>
