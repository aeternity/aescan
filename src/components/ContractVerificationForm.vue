<template>
  <form @submit.prevent="validateForm">
    <div class="row">
      <div>
        <div class="form-field">
          <label for="id">Smart contract ID</label>
          <br>
          <input
            id="id"
            v-model="form.id"
            placeholder="ct_..."
            required
            type="text"
            name="id">
          <p
            v-if="errors.id"
            class="field-error">
            {{ errors.id }}
          </p>
        </div>

        <div class="form-field">
          <label for="license">Compiler Version</label>
          <license-select
            id="license"
            v-model="form.license"/>
          <p
            v-if="errors.license"
            class="field-error">
            {{ errors.license }}
          </p>
        </div>

        <div class="form-field">
          <label for="compiler">License Type</label>
          <compiler-select
            id="compiler"
            v-model="form.compiler"/>
          <p
            v-if="errors.compiler"
            class="field-error">
            {{ errors.compiler }}
          </p>
        </div>

        <div class="form-field">
          <input
            id="consent"
            v-model="form.consent"
            required
            type="checkbox"
            name="lname">
          <label for="consent">
            I agree to the
            <app-link to="/terms-of-service">
              terms of service
            </app-link>
          </label>
          <p
            v-if="errors.consent"
            class="field-error">
            {{ errors.consent }}
          </p>
        </div>
      </div>
      <div>
        <contracts-file-upload class="form-field"/>
        <div class="form-field form-field__container">
          <button @click="validateForm">
            Validate
          </button>
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

const form = ref({
  id: '',
  license: null,
  compiler: null,
  consent: false,
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}

  if (!form.value.id.trim()) {
    errors.value.id = 'ID is required'
  }

  if (!form.value.license) {
    errors.value.license = 'License is required'
  }

  if (!form.value.compiler) {
    errors.value.compiler = 'Compiler is required'
  }

  if (!form.value.consent) {
    errors.value.consent = 'Consent is required'
  }
}
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

.field-error {
  color: red;
}
</style>
