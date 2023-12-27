<template>
  <form>
    <div class="row">
      <div>
        <div>
          <label for="id">Smart contract ID</label>
          <br>
          <input
            id="id"
            required
            type="text"
            name="id">
        </div>

        <div>
          <label for="license">Compiler Version</label>
          <license-select id="license"/>
        </div>

        <div>
          <label for="compiler">License Type</label>
          <compiler-select id="compiler"/>
        </div>

        <div>
          <input
            id="consent"
            required
            type="checkbox"
            name="lname">
          <label for="consent">I agree to the terms of service</label>
        </div>
      </div>
      <div>
        <file-upload/>
        <app-button type="submit">
          Submit
        </app-button>
      </div>
    </div>
  </form>
</template>
<script setup>

</script>
<style>
.row {
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  @media (--desktop) {
    flex-direction: row;
  }
}

input[type="text"] {
  width: 100%;
}
</style>
