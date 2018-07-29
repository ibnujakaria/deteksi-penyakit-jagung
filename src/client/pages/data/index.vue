<template>
  <div class="container mt-5">
    <h1>Data</h1>
    <hr>
    <div v-for="(label, i) of labels" :key="i">
      <h4 class="text-muted">{{ label.label }}</h4>
      
      <div class="row">
        <div class="col-sm-4" v-for="(image, j) of label.images" :key="j">
          <div class="image">
            <img :src="`${imageRootPath}/${image.path}`" :title="image.path">
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({ store }) {
    await store.dispatch('getAllData')
  },
  computed: {
    ...mapState ({
      labels: 'imageLabels'
    }),
    imageRootPath () {
      return `${this.$axios.defaults.baseURL}/images/penyakit-jagung`
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition-property: transform;
    transition-timing-function: ease-in;
    position: relative;

    :hover {
      transform: translateY(-1px)
    }

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
</style>

<style type="text/css">
  p {
    transition-timing-function: ease-in;
  }
</style>