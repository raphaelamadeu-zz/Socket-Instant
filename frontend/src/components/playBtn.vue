<template>
  <button class="btn" :class="playing ? 'btn-danger' : 'btn-success'">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: [
    'title',
    'playing'
  ]
}
</script>
<style scoped>

</style>