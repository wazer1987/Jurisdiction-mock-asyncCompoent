<template>
  <div class="two-container">
      我是页面二
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route.params, '----视口二的初始函数')
  }
}
</script>

<style>

</style>
