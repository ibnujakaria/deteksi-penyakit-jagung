<template>
  <div class="upload-citra">
    <div class="form-group" v-show="!blobImage">
      <label>Citra</label>
      
      <div class="mt-2">
        <input ref="input-citra" @change="onInputCitraChanged" type="file">
      </div>
    </div>
    <div v-show="blobImage">
      <div class="row">
        <div class="col-sm-2">
          <img :src="blobImage">
        </div>
        <div class="col-sm-5">
          <h6 class="text-muted mb-3">Histogram</h6>

          <div v-if="!color">
            <button class="btn btn-sm btn-default" @click="getHistogram" v-if="!loadingHistogram">Get Histogram</button>
            <p class="text-muted" v-else>
              <small>Extracting...</small>
            </p>
          </div>
          <div v-else>
            <!-- <pre>{{ color.normalizedHistogram }}</pre> -->
            <color-histogram :color="color.normalizedHistogram"></color-histogram>
          </div>
        </div>
        <div class="col-sm-5">
          <h6 class="text-muted mb-3">Texture</h6>

          <div v-if="!texture">
            <button @click="getTexture" v-if="!loadingTexture" class="btn btn-sm btn-default">Get Texture</button>
            <p class="text-muted" v-else>
              <small>Extracting...</small>
            </p>
          </div>
          <div v-else>
            <table class="table table-bordered">
              <tr v-for="(feature, i) of Object.values(texture)" :key="i">
                <th>{{ textureColumns[i] }}</th>
                <td>{{ feature }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <b-btn @click="$emit('close', i)" class="pojok-kanan" size="sm" variant="default"><i class="fa fa-times"></i></b-btn>
  </div>
</template>

<script type="text/javascript">
import ColorHistogram from '~/components/ColorHistogram'

export default {
  props: ['i'],
  data: () => ({
    blobImage: null,
    loadingHistogram: false,
    loadingTexture: false,
    color: null,
    texture: null,
    textureColumns: [] // this is for the table
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
    },
    async getTexture () {
      let inputCitra = this.$refs['input-citra']
      let file = inputCitra.files.length ? inputCitra.files[0] : null
      let payload = new FormData()

      payload.append('image', file)

      this.loadingTexture = true
      let { data } = await this.$axios.post('feature-extraction/texture', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.texture = data.texture

      let textureColumns = []

      for (let col in this.texture) {
        textureColumns.push(col)
        console.log(col)
      }

      this.textureColumns = textureColumns
      this.loadingTexture = false
    }
  },
  components: { ColorHistogram }
}
</script>

<style lang="scss" scoped>
  div.upload-citra {
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    position: relative;

    img {
      width: 100%;
    }

    .pojok-kanan {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
</style>