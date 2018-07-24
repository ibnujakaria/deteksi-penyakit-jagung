<template>
  <div class="upload-citra">
    <div class="form-group" v-show="!blobImage">
      <label>Citra</label>
      <input ref="input-citra" @change="onInputCitraChanged" class="form-control" type="file">
    </div>
    <div v-show="blobImage">
      <div class="row">
        <div class="col-sm-2">
          <img :src="blobImage">
        </div>
        <div class="col-sm-5">
          <h6 class="text-muted mb-3">Histogram</h6>

          <div v-if="!color">
            <button class="btn btn-default" @click="getHistogram" v-if="!loadingHistogram">Get Histogram</button>
            <p class="text-muted" v-else>
              <small>Extracting...</small>
            </p>
          </div>
          <div v-else>
            <pre>{{ color.normalizedHistogram }}</pre>
          </div>
        </div>
        <div class="col-sm-5">
          <h6 class="text-muted mb-3">Texture</h6>
          <button class="btn btn-default">Get Texture</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data: () => ({
    blobImage: null,
    loadingHistogram: false,
    color: null
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
    async getHistogram () {
      let inputCitra = this.$refs['input-citra']
      let file = inputCitra.files.length ? inputCitra.files[0] : null
      let payload = new FormData()

      payload.append('image', file)

      this.loadingHistogram = true
      let { data } = await this.$axios.post('feature-extraction/color', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.color = data

      this.loadingHistogram = false
    }
  }
}
</script>

<style lang="scss" scoped>
  div.upload-citra {
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
    }
  }
</style>