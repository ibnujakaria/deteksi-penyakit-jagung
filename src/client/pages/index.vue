<template>
  <section class="container">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Citra</label>
        <input class="form-control" type="file" name="">
      </div>
      <div class="form-group text-right">
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  methods: {
    async submit () {
      
    }
  }
}
</script>

