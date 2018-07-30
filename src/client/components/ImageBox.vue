<template>
  <div class="image" :class="{ active }">
    <img :src="`${imageRootPath}/${image.path}`" :title="image.path">
  </div>
</template>

<script>
export default {
  props: ['image', 'active'],
  computed: {
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
  transition-duration: 0.1s;
  position: relative;

  &.active {
    border: 5px solid rgba(255, 10, 0, 0.8);
    padding: 0px;

    &::after {
      content: '';
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &:hover {
    transform: translateY(-3px)
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
}
</style>