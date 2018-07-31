<template>
  <div class="container mt-5">
    <h1>Data K-Fold K = {{ $route.params.k }}</h1>
    <hr>
    <div class="btn-group">
      <button @click="moveTo(i)" class="btn" :class="{ 'btn-primary': i === iPartial }" v-for="(partial, i) of kFolds" :key="i">
        {{ partial.k + 1 }}
      </button>
    </div>
    <div class="mt-5" v-for="(label, i) of labels" :key="i">
      <h4 class="text-muted">{{ label.label }}</h4>
      
      <div class="row">
        <div class="col-sm-2 col-6" v-for="(image, j) of label.images" :key="j">
          <image-box :image="image" :active="isThisTestingData(image)"></image-box>
        </div>  
      </div>

      <hr>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageBox from '~/components/ImageBox'

export default {
  async fetch ({ store }) {
    await store.dispatch('getAllData')
  },
  data: () => ({
    kFolds: [],
    iPartial: 0
  }),
  computed: {
    kActive () {
      return this.kFolds[this.iPartial]
    },
    ...mapState ({
      labels: 'imageLabels'
    }),
    imageRootPath () {
      return `${this.$axios.defaults.baseURL}/images/penyakit-jagung`
    }
  },
  async mounted () {
    await this.getDataKFolds()
  },
  methods: {
    async getDataKFolds () {
      let { data } = await this.$axios.get(`data/k-fold/${this.$route.params.k}`)

      this.kFolds = data
    },
    moveTo (i) {
      this.iPartial = i
    },
    isThisTestingData (image) {
      if (this.kActive) {
        return this.kActive.testing.findIndex(image_ => image_.path === image.path) > -1
      }

      return false
    }
  },
  components: { ImageBox }
}
</script>