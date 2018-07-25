<template>
  <div>
    <top-navbar></top-navbar>
    <nuxt/>
  </div>
</template>

<script>
import TopNavbar from '~/components/TopNavbar'

export default {
  components: { TopNavbar }
}
</script>