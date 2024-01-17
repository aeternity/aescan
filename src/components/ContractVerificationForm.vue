<template>
  <form @submit.prevent="validateForm">
    files: {{ form.sourceFiles }}
    <div class="row">
      <div>
        <div class="form-field">
          <label for="id">Smart contract ID *</label>
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
          <label for="license">Compiler Version *</label>
          <compiler-select
            id="compiler"
            v-model="form.compiler"/>
          <p
            v-if="errors.license"
            class="field-error">
            {{ errors.license }}
          </p>
        </div>

        <div class="form-field">
          <label for="compiler">License Type *</label>

          <input
            id="license"
            v-model="form.license"
            required
            type="text"
            name="license">
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
        <contracts-file-upload
          class="form-field"
          @update-file="updateIt"
          @entry-file-selected="updateEntryFile"/>
        <div class="form-field form-field__container">
          <button @click="validateForm">
            Validate
          </button>
          <!--          <app-button-->
          <!--            to="/contract-verification/result"-->
          <!--            type="submit">-->
          <!--            Submit-->
          <!--          </app-button>-->
          <app-button
            type="submit"

            @click="postIt()">
            Submit
          </app-button>
        </div>
      </div>
    </div>
  </form>
  form {{ form }}
</template>

<script setup>
import { useContractVerificationStore } from '~/stores/contractVerification'

const verificationStore = useContractVerificationStore()
const { verifyContract } = verificationStore

const form = ref({
  id: '',
  license: '',
  compiler: '',
  consent: false,
  entryFile: '',
  sourceFiles: null,
})

const errors = ref({})

function updateIt(file) {
  form.value.sourceFiles = file
}

function updateEntryFile(fileName) {
  form.value.entryFile = fileName
}

function postIt() {
  validateForm()
  const isValid = Object.keys(errors.value).length === 0
  console.log('isValid', isValid)
  if (isValid) {
    verifyContract(
      form.value.id,
      form.value.license,
      form.value.compiler.value,
      form.value.entryFile,
      form.value.sourceFiles,
    )
  }
}

function validateForm() {
  // todo computed
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
