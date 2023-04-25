<template>
  <div class="terms-and-conditions">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Terms & Conditions</Title>
    </Head>
    <div class="terms-and-conditions__parallax">
      <div class="terms-and-conditions__container">
        <h1 class="terms-and-conditions__heading">
          Terms and Conditions
        </h1>

        <p class="terms-and-conditions__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut blanditiis nesciunt quibusdam.
          Adipisci architecto beatae eaque earum ipsa iste labore laudantium neque non optio quisquam quo,
          recusandae, reprehenderit ut!
          <br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At facere harum magni minima neque nisi,
          sapiente ullam velit! Dignissimos dolorum inventore modi molestiae neque quod saepe tenetur vel
          velit vero.
        </p>

        <h2 class="terms-and-conditions__subheading">
          Heading 2
        </h2>
        <p class="terms-and-conditions__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ea libero maxime? Ab accusantium at
          atque aut deserunt dolorum eligendi est eveniet illo neque, nihil non nostrum omnis, similique
          velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium architecto,
          beatae delectus, dolor dolores ea eligendi explicabo hic inventore labore magni nisi odio recusandae
          sapiente similique vel velit voluptatibus.
        </p>
        <h3 class="terms-and-conditions__subheading">
          Heading 3
        </h3>
        <p class="terms-and-conditions__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci facilis iste iure quibusdam
          reiciendis sunt? Alias beatae cum debitis deleniti est ex fugiat iste quaerat ullam unde, vero
          voluptas voluptates.Ducimus enim ipsum sapiente soluta sunt ullam. Adipisci aut doloribus nobis
          saepe tenetur. Assumenda consequuntur, culpa cumque distinctio fugiat fugit itaque maxime minima
          molestias numquam perspiciatis praesentium quibusdam, ullam voluptate.Adipisci aliquam autem,
          consectetur deleniti fugiat, harum hic laborum maiores maxime modi nisi pariatur praesentium quaerat
          quia quidem quod sapiente suscipit tenetur vitae voluptates? Aperiam cumque delectus et sapiente
          vero.Asperiores culpa distinctio doloremque esse fugiat incidunt libero minima omnis pariatur porro!
          Aliquam consequuntur corporis delectus impedit ipsa, natus officia praesentium repudiandae voluptas?
          At deserunt doloremque eligendi hic, quis suscipit.
          <br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam aperiam blanditiis, culpa
          delectus deleniti dicta eos est et illum libero, non quaerat quibusdam quos repellat sed sit soluta
          velit.Assumenda doloremque expedita molestiae, nobis nostrum ullam vitae! Aspernatur corporis
          dolorem eligendi enim excepturi exercitationem id inventore ipsam, ipsum labore laudantium magni
          nesciunt quae quos saepe, sit, soluta veritatis voluptatibus?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
.terms-and-conditions {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__container {
    max-width: 680px;
    margin: 0 auto;
  }

  &__heading {
    margin-bottom: var(--space-6);
  }

  &__subheading {
    margin-bottom: var(--space-5);
  }

  &__paragraph {
    margin-bottom: var(--space-5);
  }
}
</style>
