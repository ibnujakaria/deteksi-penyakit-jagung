<template>
  <section class="container mt-3">
    <upload-citra class="mb-3" @close="removeImage(i)" v-for="(container, i) in containers" :key="i" :i="i"></upload-citra>
    
    <div class="mt-3">
      <b-btn @click="addImage">Add Image</b-btn>
    </div>
  </section>
</template>

<script>
import UploadCitra from '~/components/UploadCitra'

export default {
  data: () => ({
    containers: [0]
  }),
  methods: {
    addImage () {
      let lastValue = this.containers[this.containers.length - 1]
      this.containers.push(lastValue + 1)
    },
    removeImage (i) {
      this.containers.splice(i, 1)
    }
  },
  components: { UploadCitra }
}
</script>

