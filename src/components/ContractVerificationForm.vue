<template>
  <form @submit.prevent="verify">
    <div class="contract-verification-form__row">
      <div class="contract-verification-form__column">
        <div class="contract-verification-form__field">
          <label for="id">
            Smart Contract ID
            <hint-tooltip>
              {{ contractVerificationHints.required }}
            </hint-tooltip>
          </label>

          <text-input
            id="id"
            v-model="form.id"
            placeholder="ct_..."
            type="text"
            class="contract-verification-form__text-input"/>
          <p
            v-if="errors.id"
            class="contract-verification-form__error">
            {{ errors.id }}
          </p>
        </div>

        <div class="contract-verification-form__field">
          <label for="compiler">
            Compiler Version
            <hint-tooltip>
              {{ contractVerificationHints.required }}
            </hint-tooltip>
          </label>
          <compiler-select
            id="compiler"
            v-model="form.compiler"
            class="contract-verification-form__select"/>
          <p
            v-if="errors.compiler"
            class="contract-verification-form__error">
            {{ errors.compiler }}
          </p>
        </div>

        <div class="contract-verification-form__field">
          <label for="compiler">
            License
            <hint-tooltip>
              {{ contractVerificationHints.required }}
            </hint-tooltip>
          </label>
          <license-select
            v-model="form.license"
            class="contract-verification-form__select"/>
          <p
            v-if="errors.license"
            class="contract-verification-form__error">
            {{ errors.license }}
          </p>
        </div>
      </div>
      <div class="contract-verification-form__column">
        <contracts-file-upload
          v-model:selected-files="form.sourceFiles"
          v-model:entry-file="form.entryFile"
          class="contract-verification-form__field"/>
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
    <div class="contract-verification-form__controls">
      <div>
        <div>
          <input
            id="consent"
            v-model="form.consent"
            type="checkbox">
          <label for="consent">
            I agree to the
            <app-link to="/terms-of-service">
              Terms of Service
            </app-link>
          </label>
        </div>
        <p
          v-if="errors.consent"
          class="contract-verification-form__error">
          {{ errors.consent }}
        </p>
      </div>
      <app-button
        class="contract-verification-form__submit"
        type="submit"
        :disabled="isSubmitting">
        Verify Smart Contract
      </app-button>
    </div>
  </form>
</template>

<script setup>
import { useContractVerificationStore } from '@/stores/contractVerification'
import { contractVerificationHints } from '@/utils/hints/contractVerificationHints'

const verificationStore = useContractVerificationStore()
const { verifyContract } = verificationStore
const { push } = useRouter()

const form = ref({
  id: '',
  compiler: '',
  license: '',
  entryFile: '',
  sourceFiles: null,
  consent: false,
})

const errors = ref({})
const isSubmitting = ref(false)

async function verify() {
  validate()
  const isValid = Object.keys(errors.value).length === 0
  if (isValid) {
    isSubmitting.value = true

    await verifyContract(
      form.value.id.trim(),
      form.value.compiler.value,
      form.value.license.key,
      form.value.entryFile,
      form.value.sourceFiles,
    )
    push('/contract-verification/result')
  }
}

function validate() {
  errors.value = {}

  if (!form.value.id) {
    errors.value.id = 'Please fill Smart Contract ID'
  }

  if (!form.value.compiler) {
    errors.value.compiler = 'Please select Compiler Version'
  }

  if (!form.value.license) {
    errors.value.license = 'Please select License'
  }

  if (!form.value.entryFile) {
    errors.value.entryFile = 'Please select entry file'
  }

  if (!form.value.sourceFiles) {
    errors.value.sourceFiles = 'Please select contract files'
  }

  if (!form.value.consent) {
    errors.value.consent = 'Please agree with Terms of Service'
  }
}

</script>

<style scoped>
.contract-verification-form {
  &__field {
    margin-bottom: var(--space-1);
  }

  &__row {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: var(--space-4);
    margin-bottom: var(--space-3);

    @media (--desktop) {
      flex-direction: row;
    }
  }

  &__column {
    width: 100%;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (--desktop) {
      justify-content: flex-end;
    }
  }

  &__error {
    color: var(--color-fire);
  }

  &__submit {
    margin-left: var(--space-2);
  }

  &__select {
    width: 100%;
  }

  &__text-input {
    width: 100%;
  }
}
</style>
