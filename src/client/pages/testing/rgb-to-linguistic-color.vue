<template>
  <div class="container mt-5">
    <h2>RGB to Linguistic Color</h2>
    <hr>
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-4">
            <no-ssr placeholder="Loading..">
              <sketch v-model="colors"></sketch>
            </no-ssr>
          </div>
          <div class="col">
            <div>
              <pre>{{ colors.rgba }}</pre>
            </div>
            <div v-if="result">
              <pre>{{ result.labColor }}</pre>
              <pre>{{ result.fuzzySet }}</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div v-if="!loading">
          <div v-if="result">
            <div v-for="(possibility, i) of result.possibleLinguisticColors" :key="i">
              <span v-if="possibility.color !== result.then">
                {{ possibility.color }} ({{ possibility.value.toFixed(2) }}%)
              </span>
              <strong v-else>
                {{ possibility.color }} ({{ possibility.value.toFixed(2) }}%)
              </strong>
            </div>
            <pre>{{ result.possibleLinguisticColors }}</pre>
          </div>
        </div>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'

let timeout = null
  
export default {
  data: () => ({
    colors: {
      rgba: null,
      hex: null
    },
    result: null,
    loading: false
  }),
  methods: {
    onSketchChanged () {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        this.convert()
      }, 250)
    },
    async convert () {
      this.loading = true
      
      let rgb = { ...this.colors.rgba }
      delete rgb.a

      let { data } = await this.$axios.post('rgb-to-linguistic-color', { rgb })
      
      this.loading = false

      this.result = data
    }
  },
  watch: {
    'colors.hex' () {
      this.onSketchChanged()
    }
  },
  components: { Sketch }
}
</script>