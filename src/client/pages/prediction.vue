<template>
  <section class="container mt-5">
    <h1>Prediksi</h1>
    <pre>{{ api }}</pre>
    <hr>
    <div class="mt-3">
      <div class="row">
        <div class="col-sm-3">
          <img v-if="blobImage" :src="blobImage">

          <div class="mt-3">
            <input ref="input-citra" @change="onInputCitraChanged" type="file">
          </div>

          <div class="mt-3" v-if="blobImage" >
            <button v-if="!loading" class="btn btn-block" @click="predict()">Predict</button>
            <button v-else class="btn btn-block disabled">Predicting...</button>
          </div>
        </div>
        <div class="col-sm-4">
          <div v-if="result">
            <h5>Prediksi Penyakit</h5>
            <pre>{{ result.result }}</pre>
          </div>
        </div>
        <div class="col-sm-5">
          <div v-if="result">
            <h5>Result</h5>
            <pre>{{ result }}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data: () => ({
    blobImage: null,
    loading: false,
    result: null,
    api: {
      url: 'http://http://156.67.216.181:1234/predict',
      method: 'POST',
      body: {
        image: '[FILE]'
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  }),
  methods: {
    onInputCitraChanged (e) {
      let reader = new FileReader()
      let file = e.target.files.length ? e.target.files[0] : null

      if (file) {
        reader.readAsDataURL(file)
      }

      reader.onload = data => {
        this.blobImage = data.target.result
      }
    },
    async predict () {
      let inputCitra = this.$refs['input-citra']
      let file = inputCitra.files.length ? inputCitra.files[0] : null
      let payload = new FormData()

      payload.append('image', file)

      this.loading = true
      this.result = false

      try {
        let { data } = await this.$axios.post('predict', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.result = data
      } catch (error) {
        console.error(error)
        alert('Error something..')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>