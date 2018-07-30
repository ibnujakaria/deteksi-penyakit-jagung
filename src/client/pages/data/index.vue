<template>
  <div class="container mt-5">
    <h1>Data</h1>
    <hr>
    <div v-for="(label, i) of labels" :key="i">
      <h4 class="text-muted">{{ label.label }}</h4>
      
      <div class="row">
        <div class="col-sm-4" v-for="(image, j) of label.images" :key="j">
          <image-box :image="image"></image-box>
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
  computed: {
    ...mapState ({
      labels: 'imageLabels'
    })
  },
  components: { ImageBox }
}
</script>
