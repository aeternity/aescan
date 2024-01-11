<template>
  <form>
    <div class="row">
      <div>
        <div class="form-field">
          <label for="id">Smart contract ID</label>
          <br>
          <input
            id="id"
            placeholder="ct_..."
            required
            type="text"
            name="id">
        </div>

        <div class="form-field">
          <label for="license">Compiler Version</label>
          <license-select id="license"/>
        </div>

        <div class="form-field">
          <label for="compiler">License Type</label>
          <compiler-select id="compiler"/>
        </div>

        <div class="form-field">
          <input
            id="consent"
            required
            type="checkbox"
            name="lname">
          <label for="consent">
            I agree to the
            <app-link to="/terms-of-service">
              terms of service
            </app-link>
          </label>
        </div>
      </div>
      <div>
        <contracts-file-upload class="form-field"/>
        <div class="form-field form-field__container">
          <app-button
            to="/contract-verification/result"
            type="submit">
            Submit
          </app-button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>

</script>
<style scoped>
.row {
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  margin-bottom: var(--space-3);

  @media (--desktop) {
    flex-direction: row;
  }
}

input[type="text"] {
  width: 100%;
}

.form-field {
  margin-bottom: var(--space-1);

  &__container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
