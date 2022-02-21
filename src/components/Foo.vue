<template>
  <div class="foo" @click="handleClick">foo</div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('foo component')
    },
  },
}
</script>

<style >
.foo {
  color: blue;
}
</style>