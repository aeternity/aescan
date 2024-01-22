<template>
  <form @submit.prevent="validate">
    <!--    todo html valid-->
    <div class="contract-verification-form__row">
      <div>
        <div class="contract-verification-form">
          <!--          todo hint-->
          <label for="id">Smart contract ID *</label>
          <br>
          <input
            id="id"
            v-model="form.id"
            placeholder="ct_..."
            required
            type="text"
            class="contract-verification-form__text-input">
          <!--     todo componentize-->
          <p
            v-if="errors.id"
            class="contract-verification-form__error">
            {{ errors.id }}
          </p>
        </div>

        <div class="contract-verification-form">
          <label for="license">Compiler Version *</label>
          <compiler-select
            id="compiler"
            v-model="form.compiler"/>
          <p
            v-if="errors.license"
            class="contract-verification-form__error">
            {{ errors.license }}
          </p>
        </div>

        <div class="contract-verification-form">
          <label for="compiler">License Type *</label>
          <input
            id="license"
            v-model="form.license"
            required
            type="text"
            class="contract-verification-form__text-input">
          <p
            v-if="errors.compiler"
            class="contract-verification-form__error">
            {{ errors.compiler }}
          </p>
        </div>
      </div>
      <div>
        <contracts-file-upload
          class="contract-verification-form"
          @update-file="updateIt"
          @entry-file-selected="updateEntryFile"/>
        <p
          v-if="errors.sourceFiles"
          class="contract-verification-form__error">
          {{ errors.sourceFiles }}
        </p>
        <p
          v-if="errors.entryFile"
          class="contract-verification-form__error">
          {{ errors.entryFile }}
        </p>
      </div>
    </div>
    <div class="contract-verification-form contract-verification-form__container">
      <div>
        <div>
          <input
            id="consent"
            v-model="form.consent"
            required
            type="checkbox">
          <label for="consent">
            I agree to the
            <app-link to="/terms-of-service">
              terms of service
            </app-link>
          </label>
        </div>
        <div>
          <p
            v-if="errors.consent"
            class="contract-verification-form__error">
            {{ errors.consent }}
          </p>
        </div>
      </div>
      <!--      todo add type submit-->
      <app-button
        class="contract-verification-form__submit"
        @click="submit()">
        Submit
      </app-button>
    </div>
  </form>
  form {{ form }}
  <br>
  files: {{ form.sourceFiles }}
  <div v-for="file in form.sourceFiles">
    {{ file.name }}
  </div>
</template>

<script setup>
import { useContractVerificationStore } from '~/stores/contractVerification'

const verificationStore = useContractVerificationStore()
const { verifyContract } = verificationStore
const { push } = useRouter()

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

async function submit() {
  validate()
  const isValid = Object.keys(errors.value).length === 0
  console.log('isValid', isValid)
  if (isValid) {
    const result = await verifyContract(
      form.value.id.trim(),
      form.value.license.trim(),
      form.value.compiler.value,
      form.value.entryFile,
      form.value.sourceFiles,
    )
    console.log('aaa result', result)
    push('/contract-verification/result')
  }
}

function validate() {
  errors.value = {}

  if (!form.value.id) {
    errors.value.id = 'ID is required'
  }

  if (!form.value.license) {
    errors.value.license = 'Please fill license'
  }

  if (!form.value.compiler) {
    errors.value.compiler = 'Please select compiler'
  }

  if (!form.value.consent) {
    errors.value.consent = 'Please agree with terms and conditions'
  }

  if (!form.value.entryFile) {
    errors.value.entryFile = 'Please select entry file'
  }

  if (!form.value.sourceFiles) {
    errors.value.sourceFiles = 'Please select contract files'
  }
}
</script>

<style scoped>

.contract-verification-form {
  margin-bottom: var(--space-1);

  &__text-input {
    width: 100%;
  }

  &__row {
    display: flex;
    flex-direction: column;

    justify-content: space-around;
    margin-bottom: var(--space-3);

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__error {
    color: var(--color-fire);
  }

  &__submit {
    margin-left: var(--space-2);
  }
}
</style>
