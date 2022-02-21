<template>
  <div class="bar">
    {{ $store.state.name }}
    {{ $store.state.age }}
  </div>
</template>
<script>
export default {
  asyncData(store) {
    // 这个方法是在（后端调用）
    return store.dispatch('changeAll')
  },
  mounted() {
    this.$store.dispatch('changeAll')
  },
}
</script>

<style>
.bar {
  color: red;
}
</style>